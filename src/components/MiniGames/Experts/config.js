import shuffle from '../../../utils/shuffleArray';

export default function getConfig({ count = 16, end = 20, bestErrors = 0 }) {
  const experts = [];
  for (let i = 0; i < count; i++) {
    experts.push({
      gender: Math.random() > 0.5 ? 'MAN' : 'WOMAN',
      score: 0,
    });
  }

  const bestExpertErrors = Array.from({ length: end }, (v, k) => k + 1);

  shuffle(bestExpertErrors);

  return {
    experts,
    score: 0,
    day: 0,
    end,
    bestExpert: Math.floor(Math.random() * count),
    bestExpertErrors: bestExpertErrors.slice(0, bestErrors),
  };
}
