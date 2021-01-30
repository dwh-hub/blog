<template>
  <div class="music-palyer blog-item" :class="size + '-palyer'">
    <video
      class="video"
      src="http://cdn.dahuayuan.cn/bgm.m4a"
      @canplay="loadSuccess"
      @timeupdate="timeupdate"
    ></video>
    <div class="music-cover">
      <div class="palyer-play" :class="{ 'player-pause': video.isPlay }">
        <div class="palyer-play-button" @click="switchPlayerState">
          <svg
            v-if="!video.isPlay"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            viewBox="0 0 16 31"
          >
            <path
              class="aplayer-play"
              d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"
            ></path>
          </svg>
          <svg
            v-else
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            viewBox="0 0 17 32"
          >
            <path
              class="aplayer-pause"
              d="M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="music-main">
      <div class="music-info">
        <span class="music-name">大人</span>
        <span class="music-singer"> - 星弟</span>
      </div>
      <div class="music-progress">
        <div class="progress-bar" ref="progressBar">
          <div
            class="played-progress-bar"
            :style="{ width: video.percent + '%' }"
          >
            <div class="progress-control" ref="progressControl"></div>
          </div>
        </div>
        <div class="progress-time">
          - {{ video.currentTime }}/{{ video.duration }}
        </div>
        <div class="horn">
          <div class="volume">
            <div
              class="volume-bar"
              :style="{ height: video.volumePercent + '%' }"
            ></div>
          </div>
          <div @click="switchPlayerMult">
            <svg
              v-if="!video.isMute"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              height="100%"
              version="1.1"
              viewBox="0 0 28 32"
              width="100%"
            >
              <path
                class="aplayer-fill"
                d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z"
              ></path>
            </svg>
            <svg
              v-else
              xmlns:xlink="http://www.w3.org/1999/xlink"
              height="100%"
              version="1.1"
              viewBox="0 0 28 32"
              width="100%"
            >
              <path
                class="aplayer-fill"
                d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "small",
    },
  },
  data() {
    return {
      video: {
        currentTime: "00:00",
        duration: "00:00",
        percent: 0,
        isDown: false,
        isPlay: false,
        isMute: false,
        volumePercent: 100,
      },
      videoELe: null,
    };
  },
  mounted() {
    this.videoELe = document.querySelector(".video");
    this.watchProgress();
  },
  methods: {
    // 加载完成
    loadSuccess() {
      let time = parseInt(this.videoELe.duration);
      this.video.duration = this.computedTime(time);
    },
    // 播放时更新进度条
    timeupdate() {
      if (this.video.isDown) return;
      let time = parseInt(this.videoELe.duration);
      let curTime = parseInt(this.videoELe.currentTime);
      this.video.percent = (curTime / time) * 100;
      this.video.currentTime = this.computedTime(curTime);
    },
    watchProgress() {
      let that = this;
      let progress = this.$refs.progressControl;
      let progressBar = this.$refs.progressBar;
      let PW = progressBar.offsetWidth; // 进度条总宽度
      let newPer = 0;
      progress.onmousedown = function (ed) {
        that.video.isDown = true;
        let startX = ed.clientX;
        // 已播放宽度 这个要写在内部动态获取
        let palyedW = (that.video.percent * PW) / 100;
        let changeProgerss = function (e) {
          let newX = e.clientX;
          let diffX = newX - startX;
          newPer = ((diffX + palyedW) / PW) * 100;
          if (newPer > 100) newPer = 100;
          if (newPer < 0) newPer = 0;
          that.video.percent = newPer;
        };
        progress.onmousemove = function (em) {
          if (that.video.isDown) {
            changeProgerss(em);
          }
        };
        progress.onmouseup = function (es) {
          that.video.isDown = false;
          changeProgerss(es);
          progress.onmousemove = null;
          let time = parseInt(that.videoELe.duration);
          let curTime = parseInt((time * newPer) / 100);
          that.videoELe.currentTime = curTime;
          that.video.currentTime = that.computedTime(curTime);
        };
      };
      // document.ondragstart = function (ev) {
      //   ev.preventDefault();
      // };
      // document.ondragend = function (ev) {
      //   ev.preventDefault();
      // };
    },
    // 改变音量
    changeVolume() {
      this.video.volumePercent = this.videoELe.volume * 100;
    },
    computedTime(time) {
      let m = parseInt(time / 60);
      m = m < 10 ? "0" + String(m) : m;
      let s = time % 60;
      s = s < 10 ? "0" + String(s) : s;
      return `${m}:${s}`;
    },
    switchPlayerState() {
      if (this.videoELe.paused) {
        this.video.isPlay = true;
        this.videoELe.play();
      } else {
        this.video.isPlay = false;
        this.videoELe.pause();
      }
    },
    switchPlayerMult() {
      this.video.isMute = !this.video.isMute;
      if (this.video.isMute) {
        this.videoELe.volume = 0;
      } else {
        this.videoELe.volume = 1;
      }
      this.changeVolume();
    },
  },
};
</script>

<style lang="less" scoped>
.music-palyer {
  padding: 0;
  .video {
    opacity: 0;
    width: 0;
    height: 0;
  }
  &.small-palyer {
    display: flex;
    height: 66px;
    .music-cover {
      position: relative;
      flex-shrink: 0;
      width: 66px;
      background: #eee;
      .palyer-play {
        position: absolute;
        bottom: 50%;
        right: 50%;
        width: 26px;
        height: 26px;
        transform: translate(50%, 50%);
        transition: all 0.1s ease;
        border: 2px solid #fff;
        background-color: rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 1px rgb(0 0 0 / 20%);
        border-radius: 50%;
        .palyer-play-button {
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          svg {
            width: 20px;
            height: 20px;
            margin-left: 1px;
          }
          .aplayer-play {
            fill: rgba(255, 255, 255, 0.9);
          }
        }
        &.player-pause {
          width: 16px;
          height: 16px;
          right: 4px;
          bottom: 4px;
          transform: translate(0, 0);
          svg {
            width: 12px;
            height: 12px;
          }
          .aplayer-pause {
            fill: rgba(255, 255, 255, 0.9);
          }
        }
      }
    }
    .music-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 7px 7px 7px 10px;
      .music-info {
        .music-name {
          font-size: 14px;
          color: #000;
        }
        .music-singer {
          font-size: 12px;
          color: #666;
        }
      }
      .music-progress {
        display: flex;
        align-items: center;
        padding-left: 5px;
        user-select: none;
        .progress-bar {
          flex: 1;
          background-color: #cdcdcd;
          height: 2px;
          margin-right: 8px;
          margin-top: 2px;
          .played-progress-bar {
            position: relative;
            height: 100%;
            background-color: #b7daff;
            .progress-control {
              cursor: pointer;
              position: absolute;
              top: 50%;
              transform: translate(50%, -50%);
              right: 0;
              background-color: #fff;
              border: 1px solid #b7daff;
              width: 10px;
              height: 10px;
              box-sizing: border-box;
              border-radius: 50%;
            }
          }
        }
        .progress-time {
          flex-shrink: 0;
          font-size: 12px;
          color: #999;
        }
        .horn {
          position: relative;
          margin-left: 5px;
          flex-shrink: 0;
          width: 15px;
          height: 15px;
          cursor: pointer;
          &:hover {
            .volume {
              display: block;
            }
          }
          .volume {
            display: none;
            position: absolute;
            bottom: 15px;
            right: 8px;
            width: 5px;
            height: 35px;
            background-color: #aaa;
            transform: rotate(180deg);
            .volume-bar {
              width: 100%;
              background-color: #b7daff;
              transition: height 0.2s ease;
            }
          }
          .aplayer-fill {
            fill: #666;
          }
        }
      }
    }
  }
}
</style>