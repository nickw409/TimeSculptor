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
