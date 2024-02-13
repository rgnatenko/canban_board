const get = async<T>(baseUrl = '', url = ''): Promise<T> => {
  const response = await fetch(`${baseUrl}/issues${url}`);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

enum Query {
  CLOSED = '?state=closed',
  IN_PROGRESS = '?state=open&assignee=*',
}

export const client = {
  getTodo: <T>(baseUrl: string, url = '') => get<T>(baseUrl, url),

  getClosed: <T>(baseUrl: string, url = Query.CLOSED) => get<T>(baseUrl, url),

  getInProgress:
    <T>(baseUrl: string, url = Query.IN_PROGRESS) => get<T>(baseUrl, url),

  getIssues: async<T> (baseUrl: string) => {
    const todoIssues = await client.getTodo<T>(baseUrl);
    const inProgressIssues = await client.getInProgress<T>(baseUrl);
    const doneIssues = await client.getClosed<T>(baseUrl);

    return {
      newIssues: todoIssues,
      doneIssues: inProgressIssues,
      closedIssues: doneIssues,
    };
  },
};
