# Dev Cycle

# Code Style

## Branching

### Standard branching pattern

- Create a new branch as an offshoot from main. Each branch is a feature or\
something of the likes.
- Do local commits on this branch. DO NOT push this branch to remote.
- Once feature is done, merge main branch into local branch to test for \
breaking changes or merge commits. Once everything is clear only then merge \
local into main. This is all happening on the local computer.
- After merging into main, push main to remote and you are done.
- If you want to have your branches on a remote fork this repo on GitHub and\
work in the fork until you are ready to push to main then do a pull request.
- When main is in such a state to release a new release branch will be made\
that will not be modified and will be used as a stable version of the project.


**For creating new remote branch that a local branch will track:**\
git branch \<local-branch>\
git push --set-upstream \<origin> \<local-branch>\

**For tracking a new remote branch that you are not tracking locally:**\

If no local branch exists:\
git checkout --track \<origin/branch-name>\

If local branch already exists:\
git checkout \<branch-name>\
git branch -u \<origin/branch-name>
