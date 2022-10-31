
<template>
  <ul class="contact-containter">
    <li>
      <a target="_blank" :href="data.github">
        <div class="icon">
          <Icon type="github" />
        </div>
        <span>{{ data.githubName }}</span>
      </a>
    </li>

    <li>
      <a :href="`mailto:${data.mail}`">
        <div class="icon">
          <Icon type="xinxi" />
        </div>
        <span>{{ data.mail }}</span>
      </a>
    </li>
    <li>
      <a
        :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"
      >
        <div class="icon">
          <Icon type="qq" />
        </div>
        <span>{{ data.qq }}</span>
      </a>
      <div class="pop">
        <img :src="data.qqQrCode" alt="" />
      </div>
    </li>
    <li>
      <a>
        <div class="icon">
          <Icon type="weixin" />
        </div>
        <span>{{ data.weixin }}</span>
      </a>
      <div class="pop">
        <img :src="data.weixinQrCode" alt="" />
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  components: {
    Icon,
  },
  computed: mapState("setting", ["data"]),
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.contact-containter {
  list-style: none;
  padding: 20px;
  margin: 0;
  color: @gray;
  @itemHeight: 30px;
  li {
    height: @itemHeight;
    line-height: 30px;
    margin: 14px 0;
    position: relative;
    &:hover {
      .pop {
        transform: scaleY(1);
      }
    }
  }
  a {
    display: flex;
    cursor: pointer;
    align-items: center;
    font-size: 14px;
  }
  .icon {
    font-size: 26px;
    width: 36px;
  }
  .pop {
    position: absolute;
    left: 0;
    padding: 5px 15px;
    bottom: @itemHeight + 5px;
    background: #fff;
    border-radius: 5px;
    transform: scaleY(0);
    transform-origin: center bottom;
    transition: 0.3s;

    img {
      width: 150px;
      height: 150px;
    }

    &::after {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      background: white;
      bottom: -4px;
    }
  }
}
</style>