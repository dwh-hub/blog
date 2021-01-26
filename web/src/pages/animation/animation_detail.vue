<template>
  <div class="animation-page">
    <div class="animation-title">{{detail.name}}</div>
    <div class="columns">
      <div class="column-A" v-if="detail">
        <div class="animation-cover">
          <img :src="detail.images.large" />
        </div>
        <div class="staff-info">
          <ul class="staff-list">
            <li class="staff-item">
              <span class="staff-lable">中文名:</span
              ><span class="staff-value">{{ detail.name_cn }}</span>
            </li>
            <!-- <li class="staff-item">
              <span class="staff-lable">原版名称:</span
              ><span class="staff-value">{{ detail.name }}</span>
            </li> -->
            <li class="staff-item">
              <span class="staff-lable">放送开始时间:</span
              ><span class="staff-value">{{ detail.air_date_cn }}</span>
            </li>
            <li class="staff-item">
              <span class="staff-lable">放送星期:</span
              ><span class="staff-value">{{ detail.air_weekday_cn }}</span>
            </li>
            <li
              class="staff-item"
              v-for="(job, index) in detail.staffJob"
              :key="index"
            >
              <span class="staff-lable">{{ job.job }}:</span>
              <span class="staff-value">
                <span v-for="(staff, staffIndex) in job.staff" :key="staff.id">
                  <span>{{ staff.name }}</span>
                  <span v-if="staffIndex !== job.staff.length - 1">、</span>
                </span></span
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="column-B" v-if="detail">
        <div class="column-B-header">
          <div class="column-B-header-left">
            <div class="eps-box">
              <div class="eps-header">剧集列表</div>
              <div class="eps">
                <template v-for="(item, index) in detail.eps">
                <div
                  class="ep"
                  :class="{ eped: item.status == 'Air' }"
                  v-if="index < 60"
                  :key="item.id"
                >
                  {{ index + 1 }}
                </div>
                </template>
              </div>
            </div>
            <div class="bangumi-desc">
              <p>
                <pre>{{detail.summary}}</pre>
              </p>
            </div>
          </div>
          <div class="column-B-header-right">
            <!-- <img class="bangumi-cover" :src="detail.images.large" /> -->
          </div>
        </div>
        <div class="bangumi-role-box">
          <div class="bangumi-role-header">角色介绍</div>
          <div class="bangumi-role-list">
            <div class="bangumi-role" v-for="item in detail.crt" :key="item.id">
              <div class="role-avatar">
                <img :src="item.images.grid" />
              </div>
              <div class="role-info">
                <div class="role-name">{{ item.name }}</div>
                <div class="role-footer">
                  <div class="role-footer-item">
                    <span class="role-footer-item-label">{{ item.role_name }}</span>
                    <span class="role-footer-item-value">{{ item.name_cn }}</span>
                  </div>
                  <div class="role-footer-item">
                    <span class="role-footer-item-label">声优:</span>
                    <span class="role-footer-item-value">{{ item.actors[0].name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tools from "@/common/js/tools";

export default {
  data() {
    return {
      id: "",
      detail: null,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getAniDetail();
  },
  methods: {
    getAniDetail() {
      this.$api.bangumi.getAniDetail(this.id).then((data) => {
        let week = ["一", "二", "三", "四", "五", "六", "七"];
        data.air_weekday_cn = "星期" + week[data.air_weekday];
        data.air_date_cn = tools.formatDate(
          new Date(data.air_date),
          "yyyy年MM月dd日"
        );
        let staffJob = [];
        data.staff.forEach((staff) => {
          staff.jobs.forEach((job) => {
            if (!staffJob.filter((e) => e.job === job).length) {
              staffJob.push({
                job: job,
                staff: [staff],
              });
            } else {
              staffJob.forEach((e, index) => {
                if (e.job === job) {
                  staffJob[index].staff.push(staff);
                }
              });
            }
          });
        });
        console.log(data.summary);
        data.staffJob = staffJob;
        this.detail = data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.animation-page {
  width: 1000px;
  margin: 20px auto 0 auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 0 20px 20px 20px;
  .animation-title {
    font-size: 20px;
    font-weight: bold;
    color: #444;
    line-height: 33px;
    padding: 10px 0;
  }
  .columns {
    display: flex;
    .column-A {
      flex-shrink: 0;
      width: 220px;
      margin-right: 10px;
      .animation-cover {
        width: 200px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .staff-info {
        margin-top: 10px;
        .staff-list {
          .staff-item {
            display: flex;
            font-size: 14px;
            line-height: 18px;
            padding: 4px 2px;
            border-bottom: 1px solid #eee;
            .staff-lable {
              flex-shrink: 0;
              color: #666;
              margin-right: 4px;
            }
            .staff-value {
              flex: 1;
            }
          }
        }
      }
    }
    .column-B {
      flex: 1;
      .column-B-header {
        display: flex;
        .column-B-header-left {
          flex: 1;
          margin-right: 10px;
          .eps-box {
            padding-bottom: 10px;
            border-bottom: 1px solid #e0e0e0;
            .eps-header {
              font-size: 14px;
              color: #666;
              margin-bottom: 6px;
            }
            .eps {
              .ep {
                display: inline-block;
                min-width: 22px;
                line-height: 22px;
                text-align: center;
                box-sizing: border-box;
                color: #909090;
                background-color: #e0e0e0;
                border: 1px solid #b6b6b6;
                margin-right: 3px;
                margin-bottom: 3px;
                &.eped {
                  border: 1px solid #00a8ff;
                  background-color: #daeaff;
                  color: #06c;
                }
              }
            }
          }
          .bangumi-desc {
            padding: 5px 5px 5px 0;
            color: #333;
            font-size: 14px;
            pre {
              white-space: pre-wrap;
              word-wrap: break-word;
              font-family: Arial Narrow;
            }
          }
        }
        .column-B-header-right {
          flex-shrink: 0;
          width: 240px;
          .bangumi-cover {
            width: 100%;
          }
        }
      }
      .bangumi-role-box {
        .bangumi-role-header {
          color: #555;
          font-size: 18px;
          margin-bottom: 10px;
        }
        .bangumi-role-list {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: repeat(3, 1fr);
          .bangumi-role {
            display: flex;
            .role-avatar {
              flex-shrink: 0;
              width: 48px;
              height: 48px;
              margin-right: 8px;
              box-sizing: border-box;
              border: 1px solid #eee;
              border-radius: 4px;
              box-shadow: inset #bbb 0px 0 2px 0px;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .role-info {
              flex: 1;
              .role-name {
                line-height: 16px;
                font-size: 14px;
                color: #0084b4;
                padding-bottom: 3px;
                border-bottom: 1px solid #eee;
              }
              .role-footer {
                .role-footer-item-label {
                  font-size: 12px;
                  margin-right: 2px;
                  color: #999;
                }
                .role-footer-item-value {
                  font-size: 12px;
                  margin-right: 2px;
                  color: #666;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>