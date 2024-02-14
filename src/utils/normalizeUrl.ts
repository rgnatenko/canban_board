const normalizeUrl = (url: string) => {
  const [, , , owner, repo] = url.split('/');

  return `https://api.github.com/repos/${owner}/${repo}/issues`;
};

export default normalizeUrl;
