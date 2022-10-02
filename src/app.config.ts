export default defineAppConfig({
  pages: ['pages/index/index'],
  subpackages: [
    {
      root: 'pages/home',
      pages: ['index']
    },
    {
      root: 'pages/action/psychologicalTests',
      pages: ['index', 'topic', 'grogressGauge', 'remind', 'preliminaryEvaluation', 'done']
    },
    {
      root: 'pages/action/anxietyDiary',
      pages: ['index', 'history', 'realityCheck/index', 'detail']
    },
    {
      root: 'pages/guides',
      pages: ['login', 'index', 'userInfo', 'lawInfo']
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
})
