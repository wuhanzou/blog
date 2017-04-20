<?php
return array(
	//'配置项'=>'配置值'
	//改变模块的模板文件目录
	'VIEW_PATH'=>__ROOT__ . '/public/' . MODULE_NAME,
	// 设置默认的模板主题
	'DEFAULT_THEME' => 'dist',
	//简化模板的目录层次
	'TMPL_FILE_DEPR'=>'-',
	/* 模板相关配置 */
    'TMPL_PARSE_STRING' => array(
        '__STATIC__' => __ROOT__ . '/public/Static',
        '__ADDONS__' => __ROOT__ . '/public/' . MODULE_NAME . '/Addons',
        '__IMG__'    => __ROOT__ . '/public/' . MODULE_NAME . '/images',
        '__CSS__'    => __ROOT__ . '/public/' . MODULE_NAME . '/css',
        '__JS__'     => __ROOT__ . '/public/' . MODULE_NAME . '/js',
    ),
);