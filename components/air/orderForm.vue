<template>
  <div class="mian">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="menber-info-item">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select">
              <el-select slot="prepend" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
</style>