import request from '../request'

// 获取心理测评信息
export function getPsychometricInfo() {
  return request.get('businessModule/app/psychometricInfo')
}
// 获取心理测评-各分类题信息
export function getpsyAssQuestionList(subPsychometricId: number) {
  return request.get(`businessModule/app/psyAssQuestionList?subPsychometricId=${subPsychometricId}`)
}
// 提交练习题
export function postPracticeCommit(params) {
  return request.post('businessModule/app/practiceCommit', params)
}
