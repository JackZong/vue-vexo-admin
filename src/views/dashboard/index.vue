
<template>
  <div class="workbench flex flex-col gap-4">
    <div class="w-full">
      <el-card class="border-none!" shadow="never">
        <template #header>
          <div>
            <span class="card-title">今日数据</span>
            <span class="text-tx-secondary text-xs ml-4">
              更新时间：{{ workbenchData.today.time }}
            </span>
          </div>
        </template>

        <div class="grid grid-cols-4 gap-4">
          <num-card title="今日活跃PSP数量" num="300" icon="#4A5DFF" color="#D8F8D2">
            <div>100</div>
          </num-card>
        </div>
      </el-card>
    </div>

    <div class="lg:flex flex-1">
      <el-card class="border-none! w-full h-full lg:w-3/3" shadow="never">
        <template #header>
          <span>访问量趋势图</span>
        </template>
        <div>
          <v-charts
            style="height: 350px"
            :option="workbenchData.visitorOption"
            :autoresize="true"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup name="workbench">
import numCard from './components/num-card.vue'
// 表单数据
const workbenchData: any = reactive({
  version: {
    name: 'PAX-ADMIN-PRO',
    version: '1.0.0', // 版本号
    website: '', // 官网
    based: '',
    channel: {
      gitee: '',
      website: ''
    }
  },
  support: [],
  today: {}, // 今日数据
  menu: [], // 常用功能
  visitor: [], // 访问量
  article: [], // 文章阅读量

  visitorOption: {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    legend: {
      data: ['访问量']
    },
    itemStyle: {
      // 点的颜色。
      color: 'red'
    },
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        name: '访问量',
        data: [],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#4A5DFF',
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#4A5DFF'
              },
              {
                offset: 1,
                color: '#5777ff'
              }
            ]
          },
          opacity: 0.1
        }
      }
    ]
  },

  saleOption: {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value',
      name: '单位（万）'
    },
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        data: [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
          borderRadius: [10, 10, 0, 0]
        },
        barWidth: '40%',
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#4A5DFF'
              },
              {
                offset: 1,
                color: '#5777ff'
              }
            ]
          }
        }
      }
    ]
  }
})

// 获取工作台主页数据
// const getData = () => {
//   getWorkbench()
//     .then((res: any) => {
//       workbenchData.version = res.version
//       workbenchData.today = res.today
//       workbenchData.menu = res.menu
//       workbenchData.visitor = res.visitor
//       workbenchData.support = res.support

//       // 清空echarts 数据
//       workbenchData.visitorOption.xAxis.data = []
//       workbenchData.visitorOption.series[0].data = []
//       workbenchData.saleOption.xAxis.data = []
//       workbenchData.saleOption.series[0].data = []

//       // 写入从后台拿来的数据
//       res.visitor.date.reverse().forEach((item: any) => {
//         workbenchData.visitorOption.xAxis.data.push(item)
//       })
//       res.visitor.list[0].data.forEach((item: any) => {
//         workbenchData.visitorOption.series[0].data.push(item)
//       })
//       res.sale.date.reverse().forEach((item: any) => {
//         workbenchData.saleOption.xAxis.data.push(item)
//       })
//       res.sale.list[0].data.forEach((item: any) => {
//         if (item <= 50) {
//           item = {
//             value: item,
//             itemStyle: {
//               color: {
//                 type: 'linear',
//                 x: 0,
//                 y: 0,
//                 x2: 0,
//                 y2: 1,
//                 colorStops: [
//                   {
//                     offset: 0,
//                     color: '#ff8729'
//                   },
//                   {
//                     offset: 1,
//                     color: '#ff8729'
//                   }
//                 ]
//               }
//             }
//           }
//         }
//         workbenchData.saleOption.series[0].data.push(item)
//       })
//     })
//     .catch((err: any) => {
//       console.log('err', err)
//     })
// }

onMounted(() => {
  // getData()
})
</script>

<style lang="scss" scoped></style>
