export function useSource(data: any) {
  return data.value.data.map((item: any) => {
    return {
      package: item.properties?.Name.title[0].plain_text,
      npm: item.properties['Npm Weekly Downloads'].number,
      mirror: item.properties['NpmMirror Weekly Downloads'].number,
    }
  },
  )
}

export function useNpmData(data: any) {
  return data.value.data.map((item: any) => {
    return {
      value: item.properties['Npm Weekly Downloads'].number,
      name: item.properties?.Name.title[0].plain_text,
    }
  }).sort((a: any, b: any) => b.value - a.value)
}

export function useMirrorData(data: any) {
  return data.value.data.map((item: any) => {
    return {
      value: item.properties['NpmMirror Weekly Downloads'].number,
      name: item.properties?.Name.title[0].plain_text,
    }
  }).sort((a: any, b: any) => b.value - a.value)
}

export function useOption(source: any) {
  return ref({
    legend: {},
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    dataset: {
      dimensions: ['package', 'npm', 'mirror'],
      source,
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
        rotate: 10,
        align: 'center',
        margin: 20,
        hideOverlap: true,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
      },
      {
        type: 'bar',
      },
    ],
    grid: {
      left: '70px',
      right: '70px',
    },
  })
}

export function usePieOption(data: any, title: string) {
  return ref({
    title: {
      text: title,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        label: {
          formatter: '{b}\n{d}%',
          position: 'inside',
          fontFamily: 'sans-serif',
        },
        type: 'pie',
        radius: '80%',
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  })
}
