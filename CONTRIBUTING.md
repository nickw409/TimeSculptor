# Dev Cycle

### Feature Cycle

- New features will be added to the development branch. While this branch may be split\
between a frontend and backend they are still following the main development branch.

- When enough features are completed, the dev branch is merged with the testing branch\
and tests on the software are conducted. If all tests pass the testing branch is merged\
with the main branch. If not, the branch is not merged until all tests pass.

# Code Style

## Branching

### For each assignment, a new branch needs to be created on the remote and everyone needs to track that branch
  
**For creating new remote branch that a local branch will track:**\
git branch \<local-branch>\
git push --set-upstream \<origin> \<local-branch>\

**For tracking a new remote branch that you are not tracking locally:**\

If no local branch exists:\
git checkout --track \<origin/branch-name>\

If local branch already exists:\
git checkout \<branch-name>\
git branch -u \<origin/branch-name>
