<template>
  <div class="login-container">
    <div class="lang-change">
      <I18n />
    </div>
    <div class="pt-2 login-card">
      <!-- <div class="title">
        <img src="@/assets/imgs/logo.png" />
      </div>
      <div class="mt-2 content">
        <div class="ub ub-ac w100 content-item" @click="toLogin">
          <div class="icon-left">
            <UserOutlined />
          </div>
          <div class="ub ub-f1 ub-ver">
            <div class="con-title">{{ $t('login.internal') }}</div>
            <div class="mt-1 text">{{ $t('login.internalDes') }}</div>
          </div>
          <div class="arraw">
            <RightOutlined />
          </div>
        </div>
        <div class="mt-2 ub ub-ac w100 content-item" @click="toPartner">
          <div class="icon-left">
            <TeamOutlined />
          </div>
          <div class="ub ub-f1 ub-ver">
            <div class="con-title">{{ $t('login.partner') }}</div>
            <div class="mt-1 text">{{ $t('login.partnerDes') }}</div>
          </div>
          <div class="arraw">
            <RightOutlined />
          </div>
        </div>
      </div> -->
      <a-form
        :model="formState"
        name="basic"
        layout="vertical"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          :label="$t('login.userName')"
          name="username"
          :rules="[{ required: true, message: '请输入用户名！' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          :label="$t('login.password')"
          name="password"
          :rules="[{ required: true, message: '请输入密码！' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <div class="ub w100 ub-ac ub-pc mt-4">
          <a-button style="width: 100%" type="primary" html-type="submit">登 录</a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router' //路由
import { message } from 'ant-design-vue'
import { v4 as uuidv4 } from 'uuid'
import { setToken } from '@/utils/tools'
import JSONbig from 'json-bigint'
const router = useRouter()
// let token = getQueryString('token')||localStorage.getItem('token')
const users = ref([
  {
    username: 'huanzghen',
    password: '123456',
    token: uuidv4()
  },
  {
    username: 'admin',
    password: '123456',
    token: uuidv4()
  }
])

interface FormState {
  username: string
  password: string
  remember: boolean
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true
})
const onFinish = (values: any) => {
  console.log('Success:', values)
  if (users.value.some((item) => item.username === formState.username && item.password === formState.password)) {
    const curUser = users.value.filter(
      (item) => item.username === formState.username && item.password === formState.password
    )[0]
    localStorage.setItem('userInfo', JSON.stringify(curUser))
    setToken(curUser.token)
    setTimeout(() => {
      router.push({ path: '/' })
    }, 500)
  } else {
    message.warning('用户名或密码不正确')
  }
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
onMounted(() => {
  // alert(3)
  const obj = '{"age": {"num":99999999999999999999999999999999999}}'
  console.log(JSONbig({ storeAsString: true }).parse(obj), '777777777777777')
})
</script>
<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  background-color: #f2f3f5;
  background-image: url(@/assets/imgs/login_bg.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }

  .login-card {
    width: 480px;
    border-radius: 20px;
    // box-shadow: 0 0 10px #dcdfe6;
    background-color: rgba(255, 255, 255, 1);
    padding: 40px 40px;

    overflow: hidden;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      img {
        width: 80%;
      }
    }

    .content {
      padding: 20px 20px 40px;
      .content-item {
        height: 100px;
        padding: 20px;
        background-color: #f2f3f5;
        border-radius: 10px;
        cursor: pointer;
        border: 1px solid transparent;
        transition: all 0.3s ease-in-out;
        &:hover {
          background-color: darken($default-theme-color, 10%);
          > div:nth-child(1) {
            color: #ffffff;
          }
          .con-title,
          .text,
          .arraw {
            color: #ffffff;
          }
        }
        > div:nth-child(1) {
          font-size: 30px;
          margin-right: 10px;
          color: $default-theme-color;
          transition: all 0.5s ease-in-out;
        }
        .con-title {
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease-in-out;
        }
        .text {
          transition: all 0.3s ease-in-out;
        }
        .arraw {
          color: $default-theme-color;
          transition: all 0.3s ease-in-out;
        }
      }
      .a-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
