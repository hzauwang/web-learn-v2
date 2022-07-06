## JBrowse 1简介

[JBrowse1](https://jbrowse.org/docs/installation.html) 是基因组浏览器, 可以嵌入在html页面中, 且可以[通过url进行交互](https://jbrowse.org/docs/url_strings.html)。

## 安装  

由于jbrowse默认访问conf文件, 这样会被网络安全中心拉黑, 所以推荐使用[noconf版本](https://github.com/GMOD/jbrowse/files/5871262/JBrowse-1.16.10-noconf.zip)。

## 配置

根据官方手册中的提示进行配置即可, 注意不要配置tracks.conf文件, 而是在trackList.json中进行配置(这两个文件是等效的，只是格式不同)。  

以下为[cottonMD](http://yanglab.hzau.edu.cn/jbrowse/?data=cott&loc=A08%3A28259589..28268489&tracks=TM-1_WHU%2Cgenes%2CTM-1_WHU_VCF&highlight=)中棉花的配置文件, 可作为参考: <http://yanglab.hzau.edu.cn/static/jbr_conf/trackList.json>。

## 示例
### Reference Sequences  
使用prepare-refseqs.pl格式化参考序列, 此命令会生成trackList.json文件
```shell
bin/prepare-refseqs.pl --fasta ref.fa
```

### gff/bed  
```shell
#bed文件只需修改--gff为--bed
bin/flatfile-to-json.pl --gff test.gff3 --trackType CanvasFeatures --trackLabel mygff
```

### vcf
使用genometools中的bgzip与tabix压缩vcf文件且生成索引文件
```shell
bgzip test.vcf
tabix test.vcf.gz
```
配置json文件
```json
{
  "label": "vcf",
  "key": "test vcf",
  "storeClass": "JBrowse/Store/SeqFeature/VCFTabix",
  "urlTemplate": "path/to/test.vcf.gz",
  "type": "JBrowse/View/Track/HTMLVariants"
}
```

### bw(BigWig)
```json
{
  "style": {
    "pos_color":"#FF6600",
  },
  "autoscale" : "local",
  "key" : "test_bw",
  "type" : "JBrowse/View/Track/Wiggle/XYPlot",
  "urlTemplate" : "path/to/test.bw",
  "scale":"log",
	"bicolor_pivot" : "zero",
  "storeClass" : "JBrowse/Store/SeqFeature/BigWig",
  "label" : "test_bw",
}
```