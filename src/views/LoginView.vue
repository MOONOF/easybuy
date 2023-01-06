<template>
  <div class="loginBox">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm form"
    >
      <h2>后台管理系统</h2>
      <el-form-item label="账号:" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { LoginData } from "../type/login";
import { login } from "../request/api";
import type { FormInstance } from "element-plus";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const Router = useRouter();
    const data = reactive(new LoginData());
    const rules = {
      username: [
        {
          required: true,
          message: "请输入账号",
          trigger: "blur",
        },
        {
          min: 3,
          max: 10,
          message: "账号长度在3-10之间",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        {
          min: 3,
          max: 10,
          message: "密码长度在3-10之间",
          trigger: "blur",
        },
      ],
    };
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      // 对表单内容进验证
      // valid boolean类型
      formEl.validate((valid) => {
        if (valid) {
          login(data.ruleForm).then((res) => {
            console.log(res);

            // localStorage.setItem("token", res.data.token);
            // // 跳转
            // Router.push("/");
          });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };

    return { ...toRefs(data), rules, ruleFormRef, submitForm };
  },
});
</script>

<style lang="scss" scoped>
.loginBox {
  width: 100%;
  height: 100%;
  background: url("../assets/bg1.jpg");
  background-repeat: no-repeat;
  background-size: 100% auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .form {
    width: 30%;

    .el-button {
      margin-left: calc(50% - 36px);
    }
  }

  h2 {
    margin-left: calc(50% - 20px);
    margin-bottom: 20px;
  }
}
</style>