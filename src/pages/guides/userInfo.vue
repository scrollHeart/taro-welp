<template>
  <TopNav
    title="WELP"
    @go-path-handle="goPathHandle"
  ></TopNav>
  <div class="bg-linear"></div>
  <main class="user-info-wrap">
    <h3>人口学变量收集</h3>
    <p>您的信息仅会用于学术研究，我们将对内容绝对保密</p>
    <nut-form :model-value="formData" ref="ruleForm">
        <nut-form-item label="本人电话" prop="phone" required :rules="[{required: true, message: '请输入你的电话'},{ validator: phoneValidator, message: '电话格式不正确' }]">
            <input
                class="nut-input-text"
                @blur="customBlurValidate('phone')"
                placeholder="请输入你的电话"
                v-model="formData.phone"
                placeholder-style="color: #86909C;"
                type="text" />
        </nut-form-item>
        <nut-form-item label="出生日期" prop="date" required :rules="[{required: true, message: '请选择你的出生日期'}]">
            <span class="placeholder-title" :class="{'hidden': formData.date}">请选择你的出生日期</span>
            <nut-cell :desc="desc" @click="show = true" class="select-cell"></nut-cell>
                <nut-datepicker
                    v-model="formData.date"
                    v-model:visible="show"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :three-dimensional="false"
                    @confirm="confirm"
                    @close="close('date')"
                ></nut-datepicker>
        </nut-form-item>
        <nut-form-item label="邮箱" prop="email" required :rules="[{required: true, message: '请填写你的邮箱'}, { validator: emailValidator, message: '邮箱格式不正确' }]">
            <input
                class="nut-input-text"
                @blur="customBlurValidate('email')"
                placeholder="请填写你的邮箱"
                v-model="formData.email"
                placeholder-style="color: #86909C;"
                type="text"
            />
        </nut-form-item>
        <nut-form-item label="紧急联系人电话" prop="contactPhone" required :rules="[{required: true, message: '请输入你的紧急联系人电话'},{ validator: phoneValidator, message: '电话格式不正确' }]">
            <input
                class="nut-input-text"
                @blur="customBlurValidate('contactPhone')"
                placeholder="请输入你的紧急联系人电话"
                v-model="formData.contactPhone"
                placeholder-style="color: #86909C;"
                type="text"
            />
        </nut-form-item>
        <nut-form-item label="年级" prop="grade" required :rules="[{required: true, message: '请选择年级'}]">
            <span class="placeholder-title" :class="{'hidden': formData.grade}">请选择年级</span>
            <nut-cell :desc="descGrade" @click="()=>{showGrade=true}" class="select-cell"></nut-cell>
            <nut-picker
                v-model:visible="showGrade"
                v-model="formData.grade"
                :columns="cascaderColumns"
                @confirm="confirmGrade"
                @close="close('grade')"
            ></nut-picker>
        </nut-form-item>
        <nut-form-item label="性别（选填）">
            <span class="placeholder-title" :class="{'hidden': formData.sex}">请选择性别</span>
            <nut-cell :desc="descSex" @click="()=>{showSex=true}" class="select-cell"></nut-cell>
            <nut-picker
                v-model:visible="showSex"
                v-model="formData.sex"
                :columns="columns"
                @confirm="confirmSex"
            >
            </nut-picker>
        </nut-form-item>
        <nut-form-item label="专业（选填）">
            <input class="nut-input-text" v-model="formData.professional" placeholder="请输入你的专业" placeholder-style="color: #86909C;" type="text" />
        </nut-form-item>
        <nut-form-item label="地区（选填）">
            <span class="placeholder-title" :class="{'hidden': formData.districtId}">请选择你所在地区</span>
            <nut-cell :desc="descRegion" @click="()=>{showRegion=true}" class="select-cell"></nut-cell>
            <nut-picker
                v-model:visible="showRegion"
                v-model="formData.districtId"
                :columns="cityList"
                @confirm="confirmRegion"
            ></nut-picker>
        </nut-form-item>
        <nut-form-item label="学校（选填）">
            <input class="nut-input-text" v-model="formData.school" placeholder="请输入你所在学校" placeholder-style="color: #86909C;" type="text" />
        </nut-form-item>
    </nut-form>
    <nut-button type="primary" style="margin-right: 10px" size="large" @click="submitHandle">下一步</nut-button>
  </main>
</template>
<script lang="ts" setup>
import { ref,reactive, onMounted } from 'vue';
import Taro from '@tarojs/taro'
import { cityList } from './city'
import TopNav from '@/components/topNav.vue'
import { updateUserInfo, getUserDetail } from '@/services/apis/home'

onMounted(() => {
    // 用户信息回显
_getUserDetail();
})
const formData = reactive({
    phone: '',
    date: '',
    email: '',
    contactPhone: '',
    grade: [],
    sex: [],
    professional: '',
    districtId: [],
    school: ''
});
const ruleForm = ref<any>(null);
// 失去焦点校验
const customBlurValidate = (prop: string) => {
    ruleForm.value.validate(prop).then(({ valid, errors }: any) => {
    if (valid) {
        console.log('success', formData);
    } else {
        console.log('error submit!!', errors);
    }
    });
};
// 关闭校验
const close = (prop) => {
console.log(formData.date, 'formData.date--------close')
ruleForm.value.validate(prop).then(({ valid, errors }: any) => {
    if (valid) {
        console.log('success', formData);
    } else {
        console.log('error submit!!', errors);
    }
});
}
// 电话号码校验
const phoneValidator = (val: string) => /^400(-?)[0-9]{7}$|^1\d{10}$|^0[0-9]{2,3}-[0-9]{7,8}$/.test(val);
// 邮箱校验
const emailValidator = (val: string) => /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val);
// 请选择你的出生日期
const show = ref(false);
const desc = ref('');
const minDate = new Date(1970, 0, 1);
const maxDate = new Date(2025, 10, 1);
const confirm = ({ selectedValue, selectedOptions })=>{
    desc.value = selectedOptions.map((option) => option.text).join('-');
    formData.date = desc.value;
    close('date')
}
// 请选择性别
const showSex = ref(false);
const descSex = ref('');
const columns = ref([
    { text: '男', value: '男' },
    { text: '女', value: '女' },
]);
const confirmSex = ( { selectedValue,selectedOptions })=>{
    debugger
    descSex.value = selectedValue.join('');
    formData.sex = descSex.value;
    console.log(formData, '------confirmSex')
}

// 请选择年级
const showGrade = ref(false);
const descGrade = ref('');
const gradeValue = ref(['高中','高一']);
const cascaderColumns = ref([
    {
        text: '博士',
        value: '博士',
        children: [
        {
            text: '博一',
            value: '博一',
        },
        {
            text: '博二',
            value: '博二',
        },
        {
            text: '博三',
            value: '博三',
        }
        ]
    },
    {
        text: '硕士',
        value: '硕士',
        children: [
        {
            text: '研一',
            value: '研一',
        },
        {
            text: '研二',
            value: '研二',
        },
        {
            text: '研三',
            value: '研三',
        }
        ]
    },
    {
        text: '本科',
        value: '本科',
        children: [
        {
            text: '大一',
            value: '大一',
        },
        {
            text: '大二',
            value: '大二',
        },
        {
            text: '大三',
            value: '大三',
        },
        {
            text: '大四',
            value: '大四',
        },
        {
            text: '大五',
            value: '大五',
        },
        ]
    },
    {
        text: '专科',
        value: '专科',
        children: [
        {
            text: '大一',
            value: '大一',
        },
        {
            text: '大二',
            value: '大二',
        },
        {
            text: '大三',
            value: '大三',
        },
        ]
    },
    {
        text: '高中',
        value: '高中',
        children: [
        {
            text: '高一',
            value: '高一',
        },
        {
            text: '高二',
            value: '高二',
        },
        {
            text: '高三',
            value: '高三',
        },
        ]
    },
]);
const confirmGrade = ( { selectedValue,selectedOptions })=>{
    descGrade.value = selectedValue.join('-');
    formData.grade = descGrade.value;
    close('grade')
}
//
const showRegion = ref(false);
const descRegion = ref('');

const confirmRegion = ( { selectedValue,selectedOptions })=>{
    descRegion.value = selectedValue.join('-');
    formData.districtId = descRegion.value;
}

// 提交补全信息
const submitHandle = () => {
    // 校验必填
    ruleForm.value.validate().then(({ valid, errors }: any) => {
        if (valid) {
          console.log('success--------formData----校验完成', formData);
          debugger
          let obj = {
            phone: formData.phone,
            birthday: formData.date,
            emaile: formData.email,
            emergencyContact: formData.contactPhone,
            grade: typeof(formData.grade) === 'string' ? formData.grade : formData.grade.join('-'),
            sex: typeof(formData.sex) === 'string' ? formData.sex : formData.sex.join(''),
            professional: formData.professional,
            districtId: typeof(formData.districtId) === 'string' ? formData.districtId : formData.districtId.join('-'),
            school: formData.school,
          }
          console.log('success--------obj', obj);
            _updateUserInfo(obj);
        } else {
          console.log('error submit!!', errors);
        }
      });
}
// 提交
const _updateUserInfo = async (params) => {
    try {
        const { code, msg } = await updateUserInfo(params);
        if (code === 200) {
            // 跳转到法律说明页面
            Taro.navigateTo({url: '/pagesSub/guides/lawInfo'});
        }
        else {
            console.log(msg)
        }
    }
    catch (error) {
        console.error(error)
    }
}

// 回显
const _getUserDetail = async () => {
    try {
        // const {code, data} = {
        //     code: 200000,
        //     data: {
        //         phone: '',
        //         birthday: '',
        //         emaile: '',
        //         emergencyContact: '13099008870',
        //         grade: '',
        //         sex: '',
        //         professional: '',
        //         districtId: '',
        //         schoolName: '',
        //     }
        // }
        const { code, data, message } = await getUserDetail();
        if (code === 200000) {
            formData.phone = data.phone;
            desc.value = formData.date = data.birthday;
            formData.email = data.emaile;
            formData.contactPhone = data.emergencyContact;
            formData.grade = data.grade ? data.grade.split('-') : undefined;
            descGrade.value = data.grade;
            formData.sex = data.sex ? data.sex.split(''): undefined;
            descSex.value = data.sex;
            formData.professional = data.professional;
            formData.districtId = data.districtId ? data.districtId.split('-') : undefined;
            descRegion.value = data.districtId;
            formData.school = data.school || data.schoolName;

            console.log(formData, 'formData----------------回显')
        }
        else {
            console.log(message)
        }
    }
    catch (error) {
        console.error(error)
    }
}
</script>
<style lang="scss">
.user-info-wrap {
    padding: 0 20px;
    h3{
        font-size: 22px;
        font-weight: 600;
        color: #1D2129;
        margin-top: 30px;
        text-align: center;
    }
    p {
        font-size: 14px;
        color: #86909C;
        text-align: center;
    }
    .nut-form-item {
        flex-direction: column;
    }
    .nut-cell-group__warp {
        background-color: transparent;
    }
    .nut-cell {
        background-color: transparent;
        padding: 13px 0;
    }
    .nut-form-item__label {
        font-size: 20px;
        font-weight: 600;
        color: #1D2129;
        width: 100%;
        margin: 0 0 12px;
    }
    .nut-form-item__body__slots .nut-input-text {
        height: 48px;
        border-radius: 8px;
        border: 1px solid #E5E6EB;
        box-sizing: border-box;
        padding: 0 15px;
    }
    .select-cell {
        height: 48px;
        border-radius: 8px;
        border: 1px solid #E5E6EB;
        box-sizing: border-box;
        padding: 0 15px;
    }
    .nut-form-item::before,
    .nut-form-item.error.line::before {
        border: none;
    }
    .nut-form-item__body__tips {
        position: absolute;
        bottom: -20px;
    }
    .nut-form-item__body {
        position: relative;
    }
    .placeholder-title {
        position: absolute;
        color: #86909C;
        left: 16px;
    }
    .nut-cell__value {
        line-height: 48px;
    }
    .hidden {
        display: none;
    }
}
</style>
