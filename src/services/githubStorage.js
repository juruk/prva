/**
 * GitHub Storage Service
 * Stores application data as JSON files in a GitHub repository
 */

const GITHUB_API = 'https://api.github.com';

class GitHubStorage {
  constructor() {
    this.owner = null;
    this.repo = null;
    this.token = null;
    this.branch = 'main';
    this.dataPath = 'data'; // Folder in repo to store data
    this.initialized = false;
  }

  /**
   * Initialize GitHub storage with credentials
   */
  initialize(owner, repo, token) {
    this.owner = owner;
    this.repo = repo;
    this.token = token;
    this.initialized = true;
    
    // Save credentials to localStorage
    localStorage.setItem('github_storage_owner', owner);
    localStorage.setItem('github_storage_repo', repo);
    localStorage.setItem('github_storage_token', token);
  }

  /**
   * Load credentials from localStorage
   */
  loadCredentials() {
    const owner = localStorage.getItem('github_storage_owner');
    const repo = localStorage.getItem('github_storage_repo');
    const token = localStorage.getItem('github_storage_token');
    
    if (owner && repo && token) {
      this.owner = owner;
      this.repo = repo;
      this.token = token;
      this.initialized = true;
      return true;
    }
    return false;
  }

  /**
   * Check if storage is configured
   */
  isConfigured() {
    return this.initialized && this.owner && this.repo && this.token;
  }

  /**
   * Get file from GitHub
   */
  async getFile(filename) {
    if (!this.isConfigured()) {
      throw new Error('GitHub storage not configured');
    }

    const url = `${GITHUB_API}/repos/${this.owner}/${this.repo}/contents/${this.dataPath}/${filename}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.status === 404) {
        return null; // File doesn't exist yet
      }

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      const content = atob(data.content); // Decode base64
      return {
        content: JSON.parse(content),
        sha: data.sha // Needed for updates
      };
    } catch (error) {
      console.error('Error getting file from GitHub:', error);
      throw error;
    }
  }

  /**
   * Save file to GitHub
   */
  async saveFile(filename, content, sha = null) {
    if (!this.isConfigured()) {
      throw new Error('GitHub storage not configured');
    }

    const url = `${GITHUB_API}/repos/${this.owner}/${this.repo}/contents/${this.dataPath}/${filename}`;
    const contentBase64 = btoa(JSON.stringify(content, null, 2));

    const body = {
      message: `Update ${filename}`,
      content: contentBase64,
      branch: this.branch
    };

    if (sha) {
      body.sha = sha; // Required for updates
    }

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`GitHub API error: ${error.message || response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving file to GitHub:', error);
      throw error;
    }
  }

  /**
   * Load all application data from GitHub
   */
  async loadData() {
    try {
      const [projectsData, architectsData, contractorsData] = await Promise.all([
        this.getFile('projects.json'),
        this.getFile('architects.json'),
        this.getFile('contractors.json')
      ]);

      return {
        projects: projectsData?.content || [],
        projectsSha: projectsData?.sha,
        architects: architectsData?.content || [],
        architectsSha: architectsData?.sha,
        contractors: contractorsData?.content || [],
        contractorsSha: contractorsData?.sha
      };
    } catch (error) {
      console.error('Error loading data from GitHub:', error);
      throw error;
    }
  }

  /**
   * Save all application data to GitHub
   */
  async saveData(projects, architects, contractors, shas = {}) {
    try {
      await Promise.all([
        this.saveFile('projects.json', projects, shas.projectsSha),
        this.saveFile('architects.json', architects, shas.architectsSha),
        this.saveFile('contractors.json', contractors, shas.contractorsSha)
      ]);
      return true;
    } catch (error) {
      console.error('Error saving data to GitHub:', error);
      throw error;
    }
  }

  /**
   * Test connection to GitHub
   */
  async testConnection() {
    if (!this.isConfigured()) {
      throw new Error('GitHub storage not configured');
    }

    try {
      const url = `${GITHUB_API}/repos/${this.owner}/${this.repo}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        throw new Error(`Cannot access repository: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Error testing GitHub connection:', error);
      throw error;
    }
  }

  /**
   * Clear stored credentials
   */
  clearCredentials() {
    localStorage.removeItem('github_storage_owner');
    localStorage.removeItem('github_storage_repo');
    localStorage.removeItem('github_storage_token');
    this.owner = null;
    this.repo = null;
    this.token = null;
    this.initialized = false;
  }
}

// Create singleton instance
const githubStorage = new GitHubStorage();

export default githubStorage;

