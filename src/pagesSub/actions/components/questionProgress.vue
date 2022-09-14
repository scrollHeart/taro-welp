<template>
    <div class="level-box">
        <nut-range v-model="topicValue" hidden-range :step="16.67" @change="onChange">
            <template #button>
                <div class="custom-button">
                    <span>
                        <image style="width: 48px; height: 48px;" src="@/assets/icons/icon_location_on@2x.png" />
                        <text>{{ rangeMap }}</text>
                    </span>
                </div>
            </template>
        </nut-range>
        <div class="cross-line-group">
            <b class="cross-line1"></b>
            <b class="cross-line2"></b>
            <b class="cross-line3"></b>
            <b class="cross-line4"></b>
            <b class="cross-line5"></b>
        </div>
        <div class="left-cross-box" :class="{'no-selected-cross-box': rangeMap === '1'}"></div>
        <div class="right-cross-box" :class="{'selected-cross-box': rangeMap === '7'}"></div>
        <div class="info-box"><text>基本不烦恼</text><text>适度烦恼</text><text>极度烦恼</text></div>
    </div>
</template>
<script lang="ts" setup>
import { ref, Ref } from 'vue'
// 设置区间选择器值
const topicValue:Ref<number> = ref(0);
topicValue.value = 50

// 区间选择器值转换
const rangeMap:Ref<string> = ref('');
rangeMap.value = '4'
const onChange = (value) => {
    switch (Math.floor(value * 100) / 100)
        {
            case 0:
                rangeMap.value = '1'
                break;
            case 16.67:
                rangeMap.value = '2'
                break;
            case 33.34:
                rangeMap.value = '3'
                break;
            case 50.01:
                rangeMap.value = '4'
                break;
            case 66.68:
                rangeMap.value = '5'
                break;
            case 83.35:
                rangeMap.value = '6'
                break;
            case 100.02:
                rangeMap.value = '7'
                break;
        }
}
</script>
<style lang="sass">
    .level-box {
        padding-top: 60px;
        .info-box {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #7A8499;
            margin-top: -60px;
        }
        .cross-line-group {
            width: 100%;
            height: 30px;
            position: relative;
            b {
                width: 2px;
                height: 100%;
                background-color: #FBFAF9;
                position: absolute;
                top: -17px;
            }
            .cross-line1 {
                left: 16.67%;
            }
            .cross-line2 {
                left: 33.33%;
            }
            .cross-line3 {
                left: 50%;
            }
            .cross-line4 {
                left: 66.67%;
            }
            .cross-line5 {
                left: 83.33%;
            }
        }
        .custom-button {
            width: 48px;
            height: 48px;
            image {
                width: 48px;
                height: 48px;
                position: relative;
                top: -40px;
            }
            text {
                position: relative;
                top: -85px;
                left: 21px;
                font-size: 10px;
                font-weight: 600;
                color: #5D5FEF;
            }
        }
        .left-cross-box {
            width: 30px;
            height: 30px;
            background-color: #FBFAF9;
            position: relative;
            top: -47px;
            &::before {
                content: '';
                width: 30px;
                height: 30px;
                border-radius: 30px 0 0 30px;
                background-color: #5D5FEF;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
        .right-cross-box {
            width: 30px;
            height: 30px;
            background-color: #FBFAF9;
            position: relative;
            top: -77px;
            left: 91%;
            &::before {
                content: '';
                width: 30px;
                height: 30px;
                border-radius: 0 30px 30px 0;
                background-color: #DEDDFF;
                position: absolute;
                right: 0;
                top: 0;
            }
        }
        .selected-cross-box {
            &::before {
                background-color: #5D5FEF;
            }
        }
        .no-selected-cross-box {
            &::before {
                background-color: #DEDDFF;
            }
        }
    }
</style>