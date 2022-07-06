使用[SequenceServer](https://sequenceserver.com/)搭建blast网页服务。  

## SequenceServer安装配置
1. 下载安装[blast+](https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs&DOC_TYPE=Download)  
2. 安装[SequenceServer](https://sequenceserver.com/#installation)  
3. 准备fasta格式的文件
4. 使用blast+中的makeblastdb命令构建库文件
   ```shell
   makeblastdb -dbtype <prot_or_nucl> -title <human_readable_name> -in <path_to_fasta> -parse_seqids
   ```
5. 启动SequenceServer
   ```shell
   sequenceserver -p <port> -d <path_to_database-dir> -n 50 -b <path_to_blast_binaries>
   ```  

## SequenceServer命令行选项
   |  Configuration file  |  Command line  |  Description  |
   |  ----  | ----  |  ----  |
   | :bin:  | -b/--bin | Indicates path to the BLAST+ binaries.  |
   | :database_dir:  | -d/--database_dir |  Indicates path to the BLAST+ databases.  |
   | :num_threads:  | -n/--num_threads |  Number of threads to use for BLAST search.  |
   | :host:  | -H/--host |  Host to run SequenceServer on.  |
   | :port:  | -p/--port |  Port to run SequenceServer on.  |
   | :require:	  | -r/--require |  Load extension from this file.  |

## 升级SequenceServer2.0
1. 升级[SequenceServer](https://groups.google.com/d/msg/sequenceserver/c98ePBzcuVE/lN-S35jVHgAJ)
   ```shell
   gem install --pre sequenceserver
   ```
   可以使用以下命令回调版本。
   ```shell
   gem uninstall sequenceserver
   ``` 
2. 升级后运行命令不变。
!!! note
    此时sequenceserver在blast后返回的url为www.xxx.com/{job.id}, 但是因为我们的blast服务启动的地址为www.xxx.com/{port}, 能够看到结果的url是www.xxx.com/{port}/{job.id}, 因此会导致返回的结果无法打开。目前在github上已经有人建议将返回的url改为 请求地址/{job.id}, 目前作者已经将此添加到todo里，可能以后版本会修复, 具体查看[https://github.com/wurmlab/sequenceserver/issues/555](https://github.com/wurmlab/sequenceserver/issues/555)。

以下为我目前的解决方案:  
1. 找到gem的安装路径, 该命令可能会输出多个gem的安装路径, 检查每个路径中的gems目录中的文件, 找到sequenceserver-2.0.0.rc8(也可能是2.0其他版本)。
   ```shell
   echo "$(ruby -e 'puts Gem.path')"
   ```
2. 进入到path/to/sequenceserver-2.0.0.rc8目录后
   ```shell
   cd ./lib/sequenceserver
   ```
   在server.rb文件中
   ```ruby
   def initialize(app)
     @app = app
   end
   ```
   将上述代码修改为:
   ```ruby
   def initialize(app)
     @app = app
     $my_port = app.config[:port]
   end
   ```
3. 之后继续修改routes.rb文件
   ```ruby
   redirect to("/#{job.id}")
   ```
   搜索上述代码(由于版本问题，可能稍有差异), 将其修改为: 
   ```ruby
   redirect to("/#{$my_port}/#{job.id}")
   ```
