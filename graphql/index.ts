export const getUserQuery = `
    query GetUser($email: String!) {
        user(by: { email: $email }) {
            id
            name
            email
            avatarUrl
            projects(last: 4) {
              edges {
                node {
                  id
                  title
                  image
                }
              }
            }
        }
    }
`

export const createUserMutation = `
	mutation CreateUser($input: UserCreateInput!) {
		userCreate(input: $input) {
			user {
				name
				email
				avatarUrl
				id
			}
		}
	}
`;

export const createProjectMutation = `
mutation CreateProject($input: ProjectCreateInput!) {
  projectCreate(input: $input) {
    project {
      id
      title
      description
      youtubeUrl
      linkedinUrl
	  githubUrl
	  behanceUrl
      createdBy {
        email
        name
        avatarUrl
      }
    }
  }
}`; 

export const updateProfileMutation = `
  mutation UpdateUser($id: ID!, $input: UserUpdateInput!) {
    userUpdate(by: { id: $id }, input: $input) {
      user {
        id
        name
        avatarUrl
        description
        userGithubUrl
        userBehanceUrl
        userLinkedinUrl
        userLiveSiteUrl
      }
    }
  }
`;



export const updateProjectMutation = `
	mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
		projectUpdate(by: { id: $id }, input: $input) {
		  project {
			id
			title
			description
			githubUrl
			linkedinUrl
			liveSiteUrl
			behanceUrl
			youtubeUrl
			createdBy {
			  email
			  name
			  avatarUrl
			}
		  }
		}
	}
  
`;

export const deleteProjectMutation = `
	mutation DeleteProject($id: ID!) {
		projectDelete(by: { id: $id }) {
			deletedId
		}
	}
`;

export const projectsQuery = `
query ProjectCollection($endcursor: String, $category: String) {
    projectSearch(first: 8, after: $endcursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          linkedinUrl
          behanceUrl
          description
          liveSiteUrl
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;


export const getProjectByIdQuery = `
query GetProjectById($id: ID!) {
	project(by: { id: $id }) {
	  id
	  title
	  description
	  image
	  liveSiteUrl
	  youtubeUrl
	  githubUrl
	  linkedinUrl
	  description
	  behanceUrl
	  category
	  createdBy {
		id
		name
		email
		avatarUrl
		
	  }
	}
  }
`;

export const getProjectsOfUserQuery = `
	query getUserProjects($id: ID!, $last: Int = 4) {
		user(by: { id: $id }) {
			id
			name
			email
			avatarUrl
			projects(last: $last) {
				edges {
					node {
						id
						title
						image
						category
					}
				}
			}
		}
	}
`;
