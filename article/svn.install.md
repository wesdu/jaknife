TITLE:svn编译安装步骤
AUTH:Duwei
DATE:2011-12-01 20:59
TAG:svn


最近在server上折腾了下svn，记下笔记
---------------------
> 如果是64位机器

	/openssl-1.0.0e # ./config --prefix=/usr/local/openssl/
	make
	make install
	/neon-0.29.6 # ./configure --with-ssl --with-libs=/usr/local/openssl/ --prefix=/usr/local/neon LDFLAGS="-L/lib64"
	make
	make install
	/apr-1.4.5 # ./configure --prefix=/usr/local/apr LDFLAGS="-L/lib64"
	make
	make install
	/apr-util-1.3.12 # ./configure --prefix=/usr/local/apr-util --with-apr=/usr/local/apr/ LDFLAGS="-L/lib64"
	make
	make install
	/sqlite-autoconf-3070900 # ./configure
	make
	make install
	/subversion-1.7.1 # ./configure  --with-ssl --with-apr=/usr/local/apr/ --with-apr-util=/usr/local/apr-util/ --with-neon=/usr/local/neon/ LDFLAGS="-L/lib64" --enable-shared=no
	make
	make install

> 32位机器

	/openssl-1.0.0e # ./config --prefix=/usr/local/openssl/
	make
	make install
	/neon-0.29.6 # ./configure --with-ssl --with-libs=/usr/local/openssl/ --prefix=/usr/local/neon
	make
	make install
	/apr-1.4.5 # ./configure --prefix=/usr/local/apr
	make
	make install
	/apr-util-1.3.12 # ./configure --prefix=/usr/local/apr-util --with-apr=/usr/local/apr/
	make
	make install
	/sqlite-autoconf-3070900 # ./configure
	make
	make install
	/subversion-1.7.1 # ./configure  --with-ssl --with-apr=/usr/local/apr/ --with-apr-util=/usr/local/apr-util/ --with-neon=/usr/local/neon/
	make
	make install
