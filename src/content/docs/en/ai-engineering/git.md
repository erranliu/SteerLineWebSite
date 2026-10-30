---
title: "Git"
description: "Understand repositories and branches, start using Git with GitHub, clone, commit, and push, and learn what worktrees and PRs enable in AI development."
contentId: "ai-engineering/git"
translationStatus: current
updated: "2026-10-30"
version: "0.1.3"
sidebar:
  order: 6
  label: "6. Git"
---

This lesson begins our discussion of concrete development methods. Earlier lessons explained that AI can do a great deal of implementation work, but keeping a project consistent requires people to organize requirements, tasks, information, and verification. Git is one of the first foundations to put in place.

To start using Git, the two most important concepts are **repositories and branches**. This lesson explains them, along with committing and pushing, then walks you through creating a repository on GitHub, making a simple change, recording it, and pushing it. You can leave the Git commands to AI; you do not need to memorize commands and parameters first.

## 1. Why you must use Git

**Even if you have no technical background, create a Git repository for your project before letting AI start modifying it.** Do not wait until the project has accumulated features and become difficult to manage.

Git is a version control system. It records project versions, compares changes, helps trace problems, and organizes the merging of different development efforts. The first important capability it gives AI is the ability to inspect the current changes again whenever needed.

### AI needs a reliable view of its changes

Suppose you ask AI to add refunds to an existing order system. It might change the API, update the page, and then add tests. Throughout that work, it needs to keep checking what the original implementation was, what it has changed for this task, what remains unfinished, and whether later edits have overwritten earlier results.

Git preserves a version baseline and provides a diff showing how the current files differ from that baseline. AI can inspect what was added, removed, or changed. Even if the earlier discussion has left its context, it can retrieve evidence of the actual changes as long as the baseline and files are still available.

Without the reliable differences Git provides, AI depends more heavily on records in its context of what it just changed. Continuous work accumulates many operations, and context is compressed. Those records can become incomplete, outdated, or inconsistent with the current files. AI can still read the files, but seeing their current contents alone makes it difficult to distinguish the original implementation from this task's changes, or to determine whether something was missed along the way.

For example, AI might change the definition of refund statuses, then overwrite part of that change while editing the page. If it relies only on the operation history in its context, it may assume the first change is still intact and continue working from a premise that is no longer true. Git lets it inspect the actual differences from the baseline and check whether the modification is complete.

**Losing this retrievable evidence of changes severely undermines the reliability of continuous AI development. During complex, sustained modifications, the effect can be devastating.** Git also needs to be used: AI should inspect status and differences during development and record the versions worth keeping.

The reason to use Git therefore goes well beyond being able to undo a mistake. It directly affects how AI understands its current work and provides a foundation for recovery, parallel work, and acceptance checks.

### GitHub is our recommendation for beginners

**If you are just starting, we recommend GitHub for remote Git hosting.** It can provide the Git server you need without requiring you to set one up yourself.

Git handles version control. GitHub hosts Git repositories remotely and adds collaboration capabilities such as pull requests, reviews, and automated checks. You can have AI develop on your computer, send the recorded versions to GitHub, inspect those changes, and decide whether to integrate them.

Start with this ready-made service and focus on the project and development process. You do not need to compare hosting platforms or learn server deployment and maintenance yet. AI can guide you through account, repository, and connection setup.

## 2. Core concepts and the simplest workflow

This section first explains how a project is managed, then uses a minimal workflow to show how local changes become recorded versions and appear on GitHub.

### Repository: managing project files and version history

**A repository is the unit used to manage project files and their version history.** Alongside code, you can track tests, configuration, Specs, Plans, and other development documents. When you inspect a version later, you can find its implementation and related documents together.

A project will typically have a local repository on your computer and a remote repository on GitHub. You develop, record, and inspect changes locally. The remote stores and shares the versions sent to it. Updates have to be exchanged through explicit operations; the two do not automatically stay in sync just because they belong to the same project.

For example, AI may have finished a refund feature on your computer and updated both the files and local version history, while GitHub still shows the old content. Understanding local and remote repositories tells you where the work has been saved and whether another person or development environment can retrieve it.

A repository needs a recorded version to provide a clear baseline for later changes. In this lesson, we first create a GitHub repository with a README file so it has an initial version, then bring it onto your computer to start working. AI can help decide which temporary files, generated content, and private configuration should stay out of version control.

### Branch: letting different efforts progress separately

**A branch is a line of development within the same repository that can progress separately from others.** Branches can start from a common version, accumulate their own changes, and later integrate the changes worth keeping.

A project usually designates a main branch, often named `main`, as its integration baseline. To add refunds, you can create a task branch from the main branch and let AI develop there. Commits on the task branch do not automatically enter the main branch. After checking the work, you decide whether to merge it.

This distinguishes work the project has accepted from work still being developed, checked, or explored. The main branch is only as reliable as the verification applied to changes entering it. A task branch can also contain unfinished intermediate versions.

A branch is different from an extra folder. Creating a branch does not automatically create another project directory that you can work in simultaneously. For now, understand how branches separate lines of development. Worktrees, introduced later, provide directories for simultaneous file changes.

### Commit: recording changes as a version

**A commit records a selected set of changes as a version in your local repository.** It has an identifier and a message you can use later to compare changes, trace problems, or recover recorded content.

AI might commit after completing part of the refund API, then commit again after finishing the page and tests. A task can contain multiple commits. Each should have a clear purpose and message so a person or AI can later understand what was recorded.

Saving a file to disk does not mean it has been committed. A commit also does not mean the work has passed acceptance checks. Commits can preserve useful intermediate progress; a feature is not complete merely because it has been committed.

At this point, pay attention to what the commit actually includes, whether unrelated changes have been mixed in, and what verification has been performed. AI can make the commit and write its message. You need to understand what result is being kept.

### Push: sending local commits to GitHub

**Pushing sends local commits to the corresponding branch in a remote repository.** Only after a push do those recorded changes appear on the corresponding GitHub branch, where other people, development environments, or platform checks can use them.

Committing and pushing can happen separately. AI might make several local commits and push them together. When you need to share work or preserve progress remotely, confirm that the relevant commits have been sent.

A push updates the specified remote branch. The minimal workflow in this lesson modifies, commits, and pushes directly on the main branch after cloning, updating the main branch on GitHub. When you use task branches later, pushing a task branch updates that branch and does not automatically put its changes into the main branch. You need to know where the push went and whether the remote received the expected version.

### Start by completing the simplest workflow

**The sequence below—create a repository, clone it, make a change, commit, and push—is the simplest workflow for getting familiar with Git. In actual project work, we use worktrees and PRs to organize development. Lesson 07 covers that workflow.** This first exercise helps you understand local versus remote content and file edits versus recorded versions.

Today's mainstream AI development agents can reliably understand and perform the Git operations used here. **The prompts below are examples. Express your intention directly; you do not need to copy them word for word.** Leave the commands, parameters, and necessary checks to AI.

#### Step 1: Create a repository on GitHub first

Sign in to GitHub and select **New repository** from the **+** menu in the upper-right corner. Choose your own account as the owner, enter a repository name such as `SteerLine`, and select **Public** or **Private** according to whether the project should be public.

Choose to add a README file, then click **Create repository**. A README introduces the project; here, it also gives the new repository an initial commit. Once creation finishes, you will arrive at the repository page.

In the example address `https://github.com/erranliu/SteerLine`, `erranliu` is the account that owns the repository and `SteerLine` is its name. Your repository will use your own account name. When following the steps, replace the example address with the address of the repository you just created.

#### Step 2: Ask AI to clone the repository locally

Cloning brings the GitHub repository and its version history onto your computer while retaining a connection to the remote repository. Tell AI the repository address and where you want the project stored:

> Clone https://github.com/erranliu/SteerLine to C:\Project\Steerline.

SteerLine is used here to demonstrate the prompt. For your exercise, use your own repository address and whichever local directory you prefer. This lets you push subsequent changes back to your own GitHub repository.

After cloning, you should be able to see the README in the local directory. Open that directory in your development tool and make subsequent changes there. If the tool asks you to install Git or sign in to GitHub, follow its setup instructions.

#### Step 3: Make a local change

Start with a change whose result is easy to confirm so you can observe the relationship between local files and the GitHub page. For example:

> Add a sentence introducing the project to the README.

Tell AI what your project does and let it make the change. The local README has now changed, but until the change is committed and pushed, GitHub will still show the original version. Later, code development also takes place in this cloned project directory.

#### Step 4: Commit the change

Once the content looks right, tell AI:

> Commit the current changes.

AI will inspect the changes and record a commit. Its result should include a commit identifier and summary, showing that the change is now a version in the local repository. This local commit has not automatically updated the repository on GitHub.

#### Step 5: Push to GitHub

Next, tell AI:

> Push.

After a successful push, refresh the repository page on GitHub. You should see the updated README and the new commit in its history. You have now completed the full sequence of creating a remote repository, editing locally, recording a version, and sending it back to the remote.

These two prompts separate committing and pushing so you can understand each operation. Once you are familiar with them, you can simply say, "Commit and push." Later, when using the worktree and PR workflow, AI will usually handle the necessary commits and pushes while completing the task and preparing its PR. You do not need to direct every operation manually. Lesson 07 explains this in detail.

## 3. Why AI development needs parallel work, recovery, and acceptance checkpoints

Once you understand the basic workflow, consider how it changes the conditions AI works in. As execution becomes more capable and changes happen faster, it becomes increasingly important to organize work separately, abandon failed approaches, and establish reliable starting points.

### Parallel work: letting multiple tasks progress with clear boundaries

AI can execute multiple tasks at once. If all the changes are mixed together, however, it becomes difficult to tell what a task changed, whether it is finished, and which results can be kept independently.

Suppose one task adds a refund API while another optimizes order queries. Separate task branches preserve their own development histories, and separate PRs organize the inspection and integration of their results. If one task fails its checks, that does not have to entangle another completed task with unfinished work.

Tasks modifying files simultaneously also need separate directories so they do not change the content another task is reading, running, or verifying. The next section explains how worktrees provide that capability.

Parallel work must also account for dependencies. If the refund page depends on an API contract, establish that shared contract first or arrange the tasks in the right order. Git helps organize and integrate changes. Which tasks can proceed independently still depends on the project.

### Recovery: making it possible to abandon failed attempts

AI can explore approaches quickly, and those approaches can fail. A refactor might make the implementation more complicated, or a line of development might fail to meet compatibility requirements. Continuing to patch it may no longer be worthwhile. You need to be able to abandon the attempt and start again from a clear baseline.

Commits preserve versions, and branches separate approaches. Together, they give AI evidence for comparing changes, restoring content, or undoing a set of modifications. Without those records, failed attempts can become entangled with useful work, leaving development stuck in continual patching and making it harder to decide what to keep.

Recovery also requires considering later dependencies. If a change has entered the main branch and other tasks use it, undoing it requires handling those relationships. Git provides recovery information for tracked files. Business data in a database and the state of external systems need separate arrangements.

### Acceptance checkpoints: establishing clear starting points for later work

"The refund feature passed acceptance checks" needs to refer to a specific version. If AI later changes the amount handling or permission logic, the earlier acceptance result does not automatically apply to the new implementation.

A commit identifier pinpoints the version being checked. Recording which requirements were checked, how they were verified, and what problems remain gives later development a clear basis to work from.

For example, a version may have been checked to confirm that amounts use integer cents, operations require permission checks, and repeated requests produce only one refund. If subsequent edits affect request handling, the relevant behavior needs to be checked again. After different tasks are integrated, their combined behavior also needs verification.

**An acceptance checkpoint connects a specific version, explicit requirements, and verification evidence.** A commit records a version, and a push sends it to the remote. Whether it passes acceptance checks still depends on requirements and evidence.

## 4. Understanding what branches, worktrees, and PRs enable

The preceding sections are enough to start using Git and GitHub. As your project progresses, you can explore how these mechanisms support longer autonomous tasks, more complex parallel work, and ongoing checks of development results. This section explains their capabilities without covering operational steps.

### Branches let AI explore approaches independently

Task branches can hold experiments as well as feature development. When AI tries a new refund status design, it can start from a clear version, work on a separate branch, and then decide whether to keep, adjust, or abandon the result after checking it.

The attempt now has a baseline and a scope that can be compared. You can abandon the approach while retaining the existing project baseline, or locate the relevant changes to extract useful parts. This gives AI more room to explore without requiring constant interruptions out of concern that all its changes will become mixed together.

The main branch may also integrate other work while the task is in progress. When the task branch is ready, its relationship to the current project state needs to be addressed. Showing that it runs on its old starting point is insufficient. Branches make history and changes traceable; integration still needs checking.

### Worktrees give concurrent tasks separate directories

**Git worktrees let one repository have multiple independent working directories that share version history.** A common arrangement is to give each task its own worktree and branch.

For example, the refund feature can be developed in one directory, order query optimization in another, and the main branch inspected in a third. Each AI can read, modify, and verify the files in its own directory without another task's saved edits directly changing the implementation in front of it.

**Branches separate lines of development; worktrees provide directories for working on them simultaneously.** Opening several AI sessions does not automatically isolate file changes. Giving them separate worktrees establishes the basis for independent file work.

Worktrees also let one AI preserve its current work while inspecting an older version or trying another approach in a different directory. The worktrees still belong to the same repository, so their results can be compared and integrated through shared version history.

Runtime environments need separate arrangements even after directories have been separated. Two worktrees may use the same database, port, or external service. Worktrees isolate file changes; they do not automatically isolate those resources or remove business dependencies between tasks.

### PRs organize ongoing inspection

**PR stands for pull request: a proposal to merge changes from one branch into a target branch.** For example, it might propose integrating the refund task branch into the main branch. GitHub provides PRs as a collaboration capability that brings together differences, task descriptions, discussion, reviews, and automated check results.

A PR makes a task's result something that can be inspected and updated over time. The implementing AI provides information about its changes and verification. The reviewing AI can read the actual differences, compare them with the Spec, and raise issues, keeping subsequent corrections focused on the same work.

This lets people concentrate on key judgments: whether the scope is appropriate, requirements are clear, verification covers important behavior, and identified problems have been resolved. AI can take on more of the detailed difference analysis, repeated checking, and correction. This is useful even when one person organizes development.

GitHub can also connect automated checks, such as builds and tests, to PRs. Results correspond to actual versions and help reveal deviations promptly. For now, understand how PRs bring changes and checks together. Lesson 07 covers creating, updating, and merging PRs alongside worktrees.

### A successful merge still needs integration verification

When two branches edit the same content, Git may report a conflict it cannot resolve automatically. AI can help analyze and resolve it, but it needs to understand both tasks' requirements and preserve the behavior that should hold across them. Simply choosing one side can discard the other task's results.

Some problems do not appear as text conflicts. The API and page might edit different files and merge successfully, yet the API expects cents while the page sends whole currency units. The files can be combined, but the business behavior is still wrong.

Checks passing on each task's branch and worktree therefore cannot replace verification of the combined result. Git and GitHub let AI progress, inspect, and integrate work separately. Specs, tests, and acceptance checks help determine whether the results meet the same set of requirements.

If you are starting from scratch, do not expect to master Git completely in one lesson. **Understand repositories and branches first, then have AI help you complete the simplest sequence: create a GitHub repository, clone it, make a change, commit, and push. Start using it as soon as possible.** Explore advanced features as development progresses. Real problems will help you understand why those capabilities matter.

This lesson's minimal workflow is for getting familiar with Git. In actual project work, we organize development with worktrees and PRs. The next lesson explains how Specs define what to implement and which constraints to maintain. Lesson 07 brings worktrees, Specs, and Plans together and covers the actual development workflow, including PRs.

## References

Use these resources to look up mechanisms and operations when needed. You do not need to read them all before starting to use Git. This lesson's recommendations about AI development methods and learning priorities reflect the project goals of this course.

- [What is Git? — Pro Git](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F): Git's version records and basic workflow.
- [Branches in a Nutshell — Pro Git](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell): the relationship between branches and version history.
- [What is GitHub? — GitHub Docs](https://docs.github.com/en/get-started/start-your-journey/what-is-github): GitHub's hosting and collaboration capabilities and its relationship to Git.
- [Creating a new repository — GitHub Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository): creating a repository on GitHub.
- [Cloning a repository — GitHub Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository): cloning a remote repository locally.
- [SteerLine example repository](https://github.com/erranliu/SteerLine): an example repository address; replace it with your own repository when practicing.
- [Pushing commits to a remote repository — GitHub Docs](https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository): sending local commits to a remote repository.
- [Pull requests — GitHub Docs](https://docs.github.com/en/pull-requests/reference/pull-requests): changes, discussions, reviews, and check results in PRs.
- [git-worktree documentation](https://git-scm.com/docs/git-worktree): how multiple working directories share a repository.
