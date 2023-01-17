#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 同步Github和Gitee的方案一：借助github的action实现仓库代码同步到Gitee
# 拷贝.github/workflows/syncToGitee.yml到dist目录
cp -r ../../../.github ./

git init
git add -A
git commit -m 'deploy'

# 发布到 github 的 gh-pages 分支
git push -f git@github.com:waitInHope/my-blog-vuepress.git master:gh-pages

# 同步Github和Gitee的方案二：直接把代码推送到 Github 和 Gitee 的 gh-pages 分支
# git push -f git@gitee.com:waitinhope/my-blog-vuepress.git master:gh-pages

cd -