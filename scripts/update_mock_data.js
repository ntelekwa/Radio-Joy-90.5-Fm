import fs from 'fs';

const mockDataPath = 'src/data/mockData.ts';
let mockData = fs.readFileSync(mockDataPath, 'utf8');

const newArticlesTs = fs.readFileSync('/tmp/articles_code.ts', 'utf8');

// Replace ARTICLES block
const startIndex = mockData.indexOf('export const ARTICLES: Article[] = [');
const endIndex = mockData.indexOf('export const PROGRAMS: Program[] = [');

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find boundaries in mockData.ts');
  process.exit(1);
}

mockData = mockData.slice(0, startIndex) + newArticlesTs + '\n' + mockData.slice(endIndex);

// Update INITIAL_NOTIFICATIONS to point to the real radiojoyfm.co.tz articles
mockData = mockData.replace(
  "relatedArticleId: 'art-joy-1'",
  "relatedArticleId: 'joy-2425'"
);
mockData = mockData.replace(
  "body: 'Mwang’onda ataka wahandisi kuimarisha usimamizi wa miradi ya elimu na maji Kigoma.'",
  "body: 'Mbunge atoa milioni 2.5 kusaidia mama asiyekuwa nyumba Ruchugi Uvinza.'"
);
mockData = mockData.replace(
  "relatedArticleId: 'art-joy-5'",
  "relatedArticleId: 'joy-2409'"
);
mockData = mockData.replace(
  "body: 'Dimba la Michezo: Timu za Kigoma zafanya maandalizi makubwa kuelekea mechi za mtoano za Kombe la Shirikisho.'",
  "body: 'Mayeye CUP yaanza kurindima Kigoma DC kuibua vipaji vipya vya soka.'"
);

fs.writeFileSync(mockDataPath, mockData, 'utf8');
console.log('Successfully updated src/data/mockData.ts with authentic radiojoyfm.co.tz articles!');
