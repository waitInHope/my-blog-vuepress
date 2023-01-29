# Linux常用命令整理

## 工欲善其事，必先利其器
想要快速搭建自己的网站，离不开对服务器操作系统的熟练使用  

由于服务器本身就相当于一台主机，大部分都是使用命令行操作系统，这对于习惯使用鼠标的开发人员是个挑战，
但也不用畏惧它，我们又不是要精通或者成为大师，能熟练掌握常用的命令就足以应付<font color=red>99%</font>的情况
（剩下的1%靠百度）

## 概念同步
| 英文名称 | 中文名称 | 含义 |
| ---- | ---- | ---- |
| Linux | - | 多用户系统，允许多个用户同时登陆访问 |  
| Owner | 文件所有者 | 登陆用户与该文件的关系 |
| Group | 文件所属组 | 登陆用户与该文件的关系 |
| Others | 其他 | 登陆用户既不是该文件的所有者，也不属于该文件的所有组 |
| Root | 超级用户 | 可以访问所有文件 |

> 1. 每次新建用户时，Linux都会在根目录生成一个同名的文件夹，作为该新用户后续的主目录（`/home/<username>`），
可以使用`cd ~`快捷进入用户的主目录；
> 2. 同时Linux会新建一个同名的所属组，组的出现是为了更好地进行用户管理，一个用户如果有多个所属组，可以使用`newgrp`切换所属组来获取对应组的权限

## 实操整理

### 1. adduser 和 passwd
* 首次登陆服务器，默认用户Root，如果想要对服务器进行用户管理，可以新建用户
``` shell
# 添加新用户 developer
adduser developer

# 设置 developer 的登陆密码
passwd developer
```
> 新建的用户权限都比较低，可以使用命令`sudo visudo`来打开`sudoers`配置文件
> 这种方式比直接使用`sudo vim /etc/sudoers`更安全，有语法校验，而且多用户编辑的时候会锁住`sudoers`文件
``` shell
# 打开sudoers配置文件
sudo visudo

# 添加以下代码来提高权限，允许developer用户在任何地方运行任何命令
developer ALL=(ALL:ALL) ALL
# developer代表规则应用的用户名
# 第一个ALL表示 规则应用于所有hosts
# 第二个ALL表示 规则应用于所有Users
# 第三个ALL表示 规则应用于所有Group
# 第三个ALL表示 规则应用于所有Commands

# 输入:wq保存退出后，developer用户就会获得Root权限
```

### 2. su 切换身份
```shell
# 切换为新创建的 developer 用户
su developer
```

### 3. whoami 显示当前用户名
```shell
whoami
# developer
```

### 4. pwd 显示当前路径
```shell
pwd
# /home/developer
```

### 5. mkdir 创建目录
* 创建单级目录
```shell
mkdir test
```
* 创建多级目录 
```shell
mkdir test1/test2/test3
```

### 6. cd 切换目录
```shell
# 进入新创建的test3目录
cd /home/developer/test1/test2/test3

# 返回上两级目录
cd ../../

# 进入用户 主目录
cd ~
```

### 7. touch 创建文件
```shell
# 在主目录创建文件 index.html
touch index.html
```

### 8. cp 复制文件或者目录
```shell
# -r：若给出的源文件是一个目录文件，此时将复制该目录下所有的子目录和文件。
# 把test1目录下的文件 复制到新目录 test
cp –r test1/ test
```

### 9. mv 移动文件或者重命名
* 文件重命名
```shell
mv index.html index2.html
```

* 隐藏文件
```shell
# 文件名上加上 .
mv index.html .index.html
```

* 移动文件
```shell
# 仅仅移动
mv  /home/developer/index.html   /home/admin/
# 移动又重命名
mv /home/developer/index.html   /home/admin/index2.html
```

* 批量移动
```shell
mv /home/developer/* /home/developer/folder
```

### 10. rm 删除文件或者目录
```shell
# 系统会询问
rm file

# -f 表示直接删除
# -r 表示递归删除文件目录

# 删除当前目录下的所有文件及目录
rm -r  * 

# 跑路
rm -rf /*
```

### 11. ls 列出文件和目录
* `ls`列出文件和目录
* `ls -la`，其中`-a`代表显示所有文件和目录（包括隐藏），`-l`代表以列表的形式详细展示信息

### 12. chown 更改文件所有者、所属组（change owner）
```shell
# -R：递归更改
chown [–R] 所有者 文件名
chown [-R] 所有者：所属组 文件名

# 把index.html的所有者改为 admin
chown admin index.html

# 把index.html的所有者和所属组都改为 admin
chown admin:admin index.html
```

### 13. chmod 更改文件权限(change mode)
权限除了可以用`r`、`w`、`x`表示之外，还可以通过数字表示，其中字符与数字的对应关系如下：
* r: 4
* w: 2
* x: 1
知道了对应关系，就会很方便地用数字推导出对应的权限。  
如果权限值是6（4 + 2）就代表“可读可写”，如果权限值是3（2 + 1）就代表“可写可执行”  
chmod的使用方法是`chmod [-R] xyz 文件或目录`，其中`[-R]`代表是否递归更改文件权限，`xyz`分别代表Owner、Group、Others这三种关系
```shell
chmod 750 index.html
```
Owner 的权限为 7，为可读可写可执行，Group 的权限为 5，为可读可执行，Others 的权限为 0，表示不可读写不可执行。对应字母为`-rwxr-x---`

chmod除了使用数字的方式更改文件权限，还可以仍使用字符去操作
可以将`Owner`简写为`u`(User)，将`Group`简写为`g`，将`Others`简写为`o`，用`a`表示所有的关系  
使用`+`、`-`、`=`表示添加、删除、赋予一个权限，`r`、`w`、`x`仍表示可读、可写、可执行三种权限
```shell
# 针对index.html文件，给Owner添加执行权限，给Group删除执行权限，给Others删除执行权限
chmod u+x,g-x,o-x index.html

# index.html的文件权限就是 -rwxr-xr--
chmod u=rwx,g=rx,o=r index.html
```