<template>
  <TopNav
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
  <div class="bg-linear"></div>
    <main class="law-info">
        <div>
            <span>服务说明</span>
            <p>
                Anxiety Aid 仅旨在帮助有学业焦虑症的人。如果您与任何其他心理健康问题作斗争，包括但不限于抑郁症、自杀、创伤后应激障碍、药物滥用、社交焦虑症或强迫症，您应该寻求专业帮助来处理这些问题。
            </p>
        </div>
        <div>
            Anxiety Aid 旨在充当在线教练，帮助您克服焦虑问题。 Anxiety Aid 不提供专业的医疗建议、精神病诊断或专业的心理健康治疗。
        </div>
        <div>
            有关本网站上任何产品和/或服务的信息和声明未经食品和药物管理局评估。并且无意诊断或提供专业的心理健康治疗。
        </div>
        <div>
            Anxiety Aid 不是危机服务。没有人在监控您在 Anxiety Aid 上输入的数据。如果您认为您或您认识的人会伤害自己，请立即拨打 911。
        </div>
        <div>
            <span>数据隐私</span>
            <p>我们认真对待您的隐私和个人信息。如果我们将来更改我们的隐私政策，我们将在此处发布这些更改。</p>
        </div>
        <div>
            <span>我们收集什么数据？</span>
            <p>我们需要昵称、电子邮件地址和密码来创建帐户。我们会收集您在应用中输入的信息，例如您的焦虑程度和您担心的事情。</p>
        </div>
        <div>
            <span>我们如何处理数据？</span>
            <p>Anxiety Aid 使用您的数据来理解和帮助您。 Anxiety Aid 需要存储和处理您的数据，以提供有关您的有意义的反馈和模式。</p>
        </div>
        <div>我们存储您的数据，以便您可以看到实现您的心理健康目标的进展情况。</div>
        <div>匿名数据用于改善 Anxiety Aid。您的数据用于改善 Anxiety Aid。我们审查 Anxiety Aid 的数据（不查看您的电子邮件地址）以改进 Anxiety Aid 的功能并帮助确保 Anxiety Aid 有效。</div>
        <div>我们不会将您的信息出售给第三方。你控制你的数据。根据我们的隐私政策，您可以随时获取您的数据的副本或要求将其删除。</div>
        <div>
            <span>年龄要求</span>
            <p>您必须年满 18 岁才能使用我们的应用程序。</p>
        </div>
        <nut-button size="large" type="primary" @click="goNextHandle">同意</nut-button>
    </main>
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro'
import TopNav from '@/components/topNav.vue'

const goNextHandle = () => {
    // 跳转到首页
    Taro.redirectTo({url: '/pages/home/index'})
}
</script>
<style lang="scss">
.law-info {
    padding: 20px;
    font-size: 14px;
    color: #000000;
    line-height: 22px;
    >div {
        margin-bottom: 30px;
    }
    p {
        color: #000000;
    }
}
</style>


