import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { newsService } from "./server/newsService";
import { storeService } from "./server/store";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // Security and Mobile App Headers
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Application", "Radio Joy 90.5 FM Mobile & Web");
    next();
  });

  // Authentication Middleware for Admin API routes
  const requireAdminAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Ruhusa inahitajika (Token missing or invalid)" });
    }
    const token = authHeader.split(" ")[1];
    if (!storeService.verifyToken(token)) {
      return res.status(401).json({ error: "Muda wa token umepita au sio sahihi. Tafadhali ingia tena." });
    }
    next();
  };

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      station: "Radio Joy 90.5 FM",
      frequency: "90.5 MHz",
      location: "Kigoma, Tanzania",
      stream: storeService.getStreamConfig().primary,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  // -------------------------------------------------------------
  // PUBLIC NEWS APIS
  // -------------------------------------------------------------

  // GET /api/news
  app.get("/api/news", async (req, res) => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const perPage = req.query.per_page ? parseInt(req.query.per_page as string, 10) : 9;
      const category = (req.query.category as string) || "all";
      const search = (req.query.search as string) || "";
      const forceRefresh = req.query.refresh === "true";

      const data = await newsService.getArticles({
        page,
        perPage,
        category,
        search,
        forceRefresh,
      });

      res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      res.json(data);
    } catch (error: any) {
      console.error("[API /api/news] Error:", error);
      res.status(500).json({
        error: "Failed to retrieve news articles",
        message: error.message || "Internal server error",
      });
    }
  });

  // POST /api/news/sync
  app.post("/api/news/sync", async (req, res) => {
    try {
      newsService.invalidateCache();
      const data = await newsService.getArticles({
        forceRefresh: true,
        page: 1,
        perPage: 20,
      });

      res.json({
        success: true,
        message: `Habari zimesawazishwa kikamilifu kutoka kwenye tovuti (${data.articles.length} zimepatikana).`,
        ...data,
      });
    } catch (error: any) {
      console.error("[API /api/news/sync] Error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to sync articles from news website",
        message: error.message,
      });
    }
  });

  // GET /api/news/config
  app.get("/api/news/config", (req, res) => {
    try {
      const config = newsService.getConfig();
      res.json({
        config,
        supportedAdapters: [
          {
            id: "editorial",
            label: "Chumba cha Habari cha Ndani (Editorial Newsroom)",
            defaultEndpoint: "Bila Mtandao wa Nje (0ms Latency)",
            description: "Habari zilizohaririwa na kuthibitishwa moja kwa moja na dawati la habari la Radio Joy 90.5 FM.",
          },
          {
            id: "wordpress",
            label: "WordPress REST API (radiojoyfm.co.tz)",
            defaultEndpoint: "https://radiojoyfm.co.tz/wp-json/wp/v2/posts?_embed=1",
            description: "Huvuta habari kiotomatiki kwa kutumia WordPress standard REST API ya tovuti rasmi.",
          },
          {
            id: "rss",
            label: "RSS / Atom Feeds",
            defaultEndpoint: "https://radiojoyfm.co.tz/feed",
            description: "Huvuta habari kupitia RSS feed ya kawaida ya blogu au gazeti lolote mtandaoni.",
          },
          {
            id: "json",
            label: "JSON API / Custom REST",
            defaultEndpoint: "/api/posts",
            description: "Inasaidia muundo wa JSON wa kawaida wa makala na mifumo ya kisasa ya API.",
          },
        ],
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/news/config
  app.post("/api/news/config", (req, res) => {
    try {
      const { type, url, apiKey, cacheTtlSeconds, autoSyncIntervalMinutes, name } = req.body;

      if (!type) {
        return res.status(400).json({ error: "type is required" });
      }

      if (type !== "editorial" && !url) {
        return res.status(400).json({ error: "url is required for external news sources" });
      }

      const updated = newsService.updateConfig({
        type,
        url,
        apiKey,
        cacheTtlSeconds: cacheTtlSeconds ? Number(cacheTtlSeconds) : 300,
        autoSyncIntervalMinutes: autoSyncIntervalMinutes ? Number(autoSyncIntervalMinutes) : 5,
        name,
      });

      res.json({
        success: true,
        message: "Mipangilio ya tovuti ya habari imehifadhiwa vizuri!",
        config: updated,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/news/test-connection
  app.post("/api/news/test-connection", async (req, res) => {
    try {
      const { type, url, apiKey } = req.body;
      if (!type || !url) {
        return res.status(400).json({ error: "type and url are required" });
      }

      const testResult = await newsService.testConnection(type, url, apiKey);
      res.json(testResult);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to test connection",
      });
    }
  });

  // -------------------------------------------------------------
  // RADIO STREAM & LISTENER APIS
  // -------------------------------------------------------------

  // GET /api/stream
  app.get("/api/stream", (req, res) => {
    res.json(storeService.getStreamConfig());
  });

  // GET /api/schedule (Public program schedule)
  app.get("/api/schedule", (req, res) => {
    res.json(storeService.getPrograms());
  });

  // GET /api/notifications
  app.get("/api/notifications", (req, res) => {
    res.json(storeService.getNotifications());
  });

  // GET /api/shoutouts
  app.get("/api/shoutouts", (req, res) => {
    res.json(storeService.getShoutouts());
  });

  // POST /api/shoutouts (Listener submitting message)
  app.post("/api/shoutouts", (req, res) => {
    try {
      const { senderName, location, message, programTitle, phone, category } = req.body;
      if (!senderName || !message) {
        return res.status(400).json({ error: "Jina na ujumbe vinahitajika" });
      }

      const shoutout = storeService.addShoutout({
        senderName: String(senderName).trim(),
        location: location ? String(location).trim() : "Kigoma",
        message: String(message).trim(),
        programTitle: programTitle || "Matangazo Mubashara",
        phone: phone ? String(phone).trim() : undefined,
        category: category || "greeting",
      });

      res.status(201).json({
        success: true,
        message: "Asante! Ujumbe wako umepokelewa na watangazaji wetu studio.",
        shoutout,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/shoutouts/:id/like
  app.post("/api/shoutouts/:id/like", (req, res) => {
    const likes = storeService.likeShoutout(req.params.id);
    res.json({ success: true, likes });
  });

  // -------------------------------------------------------------
  // ADMIN AUTHENTICATION & DASHBOARD APIS
  // -------------------------------------------------------------

  // POST /api/admin/login
  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Tafadhali weka jina la mtumiaji na nenosiri" });
    }

    const result = storeService.authenticateAdmin(username, password);
    if (!result.success) {
      return res.status(401).json({ error: result.error });
    }

    res.json({
      success: true,
      token: result.token,
      user: result.user,
    });
  });

  // GET /api/admin/me
  app.get("/api/admin/me", requireAdminAuth, (req, res) => {
    res.json({
      authenticated: true,
      user: {
        username: process.env.ADMIN_USERNAME || "admin",
        displayName: "Mhariri Mkuu (Radio Joy Admin)",
        role: "superadmin",
      },
    });
  });

  // GET /api/admin/stats
  app.get("/api/admin/stats", requireAdminAuth, (req, res) => {
    res.json(storeService.getStats());
  });

  // GET /api/admin/articles
  app.get("/api/admin/articles", requireAdminAuth, (req, res) => {
    res.json(storeService.getArticles());
  });

  // POST /api/admin/articles (Create or Update)
  app.post("/api/admin/articles", requireAdminAuth, (req, res) => {
    try {
      const article = req.body;
      if (!article.title) {
        return res.status(400).json({ error: "Kichwa cha habari kinahitajika" });
      }
      const saved = storeService.saveArticle(article);
      newsService.invalidateCache();
      res.json({ success: true, article: saved });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // DELETE /api/admin/articles/:id
  app.delete("/api/admin/articles/:id", requireAdminAuth, (req, res) => {
    const success = storeService.deleteArticle(req.params.id);
    newsService.invalidateCache();
    res.json({ success });
  });

  // GET /api/admin/notifications
  app.get("/api/admin/notifications", requireAdminAuth, (req, res) => {
    res.json(storeService.getNotifications());
  });

  // POST /api/admin/notifications (Broadcast push notification)
  app.post("/api/admin/notifications", requireAdminAuth, (req, res) => {
    const { title, body, type, relatedArticleId } = req.body;
    if (!title || !body) {
      return res.status(400).json({ error: "Kichwa na ujumbe wa arifa vinahitajika" });
    }

    const notif = storeService.addNotification({
      title,
      body,
      type: type || "breaking",
      relatedArticleId,
    });

    res.status(201).json({ success: true, notification: notif });
  });

  // DELETE /api/admin/notifications/:id
  app.delete("/api/admin/notifications/:id", requireAdminAuth, (req, res) => {
    const success = storeService.deleteNotification(req.params.id);
    res.json({ success });
  });

  // GET /api/admin/shoutouts
  app.get("/api/admin/shoutouts", requireAdminAuth, (req, res) => {
    res.json(storeService.getShoutouts());
  });

  // DELETE /api/admin/shoutouts/:id
  app.delete("/api/admin/shoutouts/:id", requireAdminAuth, (req, res) => {
    const success = storeService.deleteShoutout(req.params.id);
    res.json({ success });
  });

  // POST /api/admin/stream (Update stream URLs)
  app.post("/api/admin/stream", requireAdminAuth, (req, res) => {
    const updated = storeService.updateStreamConfig(req.body);
    res.json({ success: true, streamConfig: updated });
  });

  // GET /api/admin/schedule
  app.get("/api/admin/schedule", requireAdminAuth, (req, res) => {
    res.json(storeService.getPrograms());
  });

  // POST /api/admin/schedule (Create or update program)
  app.post("/api/admin/schedule", requireAdminAuth, (req, res) => {
    try {
      const programData = req.body;
      if (!programData.title) {
        return res.status(400).json({ error: "Jina la kipindi linahitajika" });
      }
      const saved = storeService.saveProgram(programData);
      res.json({ success: true, program: saved });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // DELETE /api/admin/schedule/:id
  app.delete("/api/admin/schedule/:id", requireAdminAuth, (req, res) => {
    const success = storeService.deleteProgram(req.params.id);
    res.json({ success });
  });

  // POST /api/admin/schedule/reset (Reset to default schedule)
  app.post("/api/admin/schedule/reset", requireAdminAuth, (req, res) => {
    const reset = storeService.resetScheduleToDefaults();
    res.json({ success: true, programs: reset });
  });

  // -------------------------------------------------------------
  // VITE DEV SERVER OR PRODUCTION STATIC SERVING
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Radio Joy 90.5 FM Radio & News Server running on http://localhost:${PORT}`);
  });
}

startServer();
