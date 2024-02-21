/* eslint-disable no-console */
import { Issue } from '../../types/Issue';
import { client } from '../fetchClient/fetchClient';

const validateGitHubAPI = async (apiUrl: string) => {
  try {
    const issues = await client.getIssues<Issue[]>(apiUrl);

    if (issues.newIssues && issues.inProgressIssues && issues.closedIssues) {
      return true;
    }

    return false;
  } catch (error) {
    console.log('Error while validating GitHub API link:', error);

    return false;
  }
};

export default validateGitHubAPI;
