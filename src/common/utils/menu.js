export const allMenu = [

];

export const allMenu1 = [
    {
        name: '首页123',
        url: 'index/index',
        icon: 'home',
    },
    {
        name: '用户管理模块',
        url: 'index/user',
        icon: 'home',
    },
    {
        name: '音乐模块',
        url: 'index/music',
        icon: 'bars',
        children: [
            { name: '音乐系列123', url: 'music',icon: 'bars',
                children : [
                    {
                        name: '音乐系列456', url: 'index/music12323131'
                    }
                ]
            },
        ]
    },
    {
        name: '音乐模块123',
        url: '/index/music',
        icon: 'bars',
        children: [
            { name: '音乐系列11', url: 'index/music' },
        ]
    }
    , {
        name: '工具模块',
        url: 'tool',
        icon: 'tool',
        children: [
            { name: '小应用', url: 'index/tools' },
            { name: '富文本编辑器', url: 'index/editor' },
            { name: '待办事项', url: 'index/todoList123' },
        ],
    }, {
        name: '画廊模块',
        url: 'pic',
        icon: 'edit',
        children: [
            { name: '时光相片', url: 'index/album' },
        ],
    }, {
        name: '搜索模块',
        url: 'search',
        icon: 'search',
        children: [
            { name: '搜索引擎', url: 'index/searchEngine' },
        ],
    }, {
        name: '开发模块',
        url: 'dev',
        icon: 'apple-o',
        children: [
            { name: '更多模块开发中', url: 'index/todo' },
        ],
    }, {
        name: '项目地址',
        url: 'index/follow',
        icon: 'heart-o',
    }];