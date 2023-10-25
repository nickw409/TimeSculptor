# Code Style

## Branching

### The only remote branches will be main and releases. Pull main to local then\
make a new branch from there and work on feature. Once done, do this:

git checkout main
git pull
git checkout feature-branch
git merge main

### Fix any problems at this point. Now main and feature-branch point to the \
same commit. Push main to remote and everything should work out.

## DO NOT COMMIT DIRECTLY TO MAIN EVER!
