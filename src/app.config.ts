export default defineAppConfig({
  pages: [ 'pages/loginGuide/index', 'pages/home/index', 'pages/action/index', 'pages/datas/index', 'pages/course/index'],
  subpackages: [
    {
      root: 'pagesSub/my',
      pages: ['index']
    },
    {
      root: 'pagesSub/actions/psychologicalTests',
      pages: ['index','topic', 'grogressGauge', 'remind', 'preliminaryEvaluation', 'done']
    },
    {
      root: 'pagesSub/actions/anxietyDiary',
      pages: ['index', 'history', 'realityCheck/index', 'detail']
    },
    {
      root: 'pagesSub/guides',
      pages: ['index', 'userInfo']
    }
  ],
  window: {
    backgroundColor: '#fff',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ECE5F1',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  },
  tabBar: {
    color: '#E5E6EB',
    selectedColor: '#5d5fef',
    borderStyle: 'black',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/home/index',
        iconPath: 'assets/icons/home_default.png',
        selectedIconPath: 'assets/icons/home_selected.png',
        text: '首页'
      },
      {
        pagePath: 'pages/action/index',
        iconPath: 'assets/icons/action_default.png',
        selectedIconPath: 'assets/icons/action_selected.png',
        text: '行动'
      },
      {
        pagePath: 'pages/datas/index',
        iconPath: 'assets/icons/datas_default.png',
        selectedIconPath: 'assets/icons/datas_selected.png',
        text: '数据'
      },
      {
        pagePath: 'pages/course/index',
        iconPath: 'assets/icons/course_default.png',
        selectedIconPath: 'assets/icons/course_selected.png',
        text: '课程'
      },
    ]
  }
})
