import { RawTask } from '@/types';

export const SAMPLE_TASKS: RawTask[] = [
  {
    id: '1',
    description: 'Need to fix the login page it keeps crashing when users try to sign in with Google OAuth and Sarah from marketing is getting frustrated because she can\'t access the dashboard to update the campaign metrics before the client meeting tomorrow at 3pm'
  },
  {
    id: '2', 
    description: 'Call John about the API integration thing he mentioned in the slack channel yesterday or was it Monday? Anyway it\'s something about rate limiting and 429 errors affecting the mobile app performance'
  },
  {
    id: '3',
    description: 'Update the database schema for user profiles to include the new fields that the design team requested - avatar URL, bio, social links, etc. Mike said this is blocking the profile redesign'
  },
  {
    id: '4',
    description: 'Client wants to change the color scheme again 🙄 they saw competitor website and now want something similar - need to update the brand guidelines and get approval from legal team first'
  },
  {
    id: '5',
    description: 'Server keeps going down during peak hours around 2-4pm EST, need to investigate if it\'s a memory leak or if we need to scale up the infrastructure. DevOps team is swamped with other priorities'
  },
  {
    id: '6',
    description: 'Write unit tests for the payment processing module that Jake built last month, we\'re at like 40% code coverage and the stakeholders are asking about quality metrics'
  },
  {
    id: '7',
    description: 'Meeting notes from client call: they want mobile app ready for app store submission by end of month, need to implement push notifications and offline sync'
  },
  {
    id: '8',
    description: 'Bug report: users can\'t upload files larger than 10MB even though we supposedly increased the limit to 50MB last week, something wrong with the nginx config probably'
  },
  {
    id: '9',
    description: 'Marketing team needs analytics dashboard to track user engagement metrics for the Q4 report - specifically looking at time spent on different pages and conversion funnels'
  },
  {
    id: '10',
    description: 'Security audit flagged several vulnerabilities in dependencies, need to update packages and make sure we\'re not exposing sensitive data in error messages'
  }
];
