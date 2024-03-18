const normalizeUrl = (url: string) => {
  const [, , , owner, repo] = url.split('/');

  if (!owner || !repo) {
    throw new Error('Invalid GH link');
  }

  const fullLink = `https://api.github.com/repos/${owner}/${repo}/issues`;

  const organizationLinkHref = `https://github.com/${owner}`;
  const organizationLinkName = owner.charAt(0).toUpperCase() + owner.slice(1);

  const repositoryLinkHref = `https://github.com/${owner}/${repo}`;
  const repositoryLinkName = repo.charAt(0).toUpperCase() + repo.slice(1);

  const organizationLink = {
    name: organizationLinkName,
    link: organizationLinkHref,
  };

  const repositoryLink = {
    name: repositoryLinkName,
    link: repositoryLinkHref,
  };

  return { fullLink, organizationLink, repositoryLink };
};

export default normalizeUrl;
