<template>
  <div class="dataform">
    <div class="inputbox">
      <div class="inputbox-container">
        <a-textarea v-model:value="source" placeholder="JSon data respond" :rows="25"/>
      </div>
      <div class="inputbox-target">
        <!--        <a-textarea v-model:value="target" placeholder="JSon Path" :rows="25" disabled=""/>-->
        <pre>{{ target }}</pre>
      </div>
    </div>
    <div class="inputbox">
      <div class="inputbox-json">
        <a-input v-model:value="jsonFilter" placeholder="Json Path fliter"/>
      </div>
    </div>
    <div class="result">{{ formatTable }}</div>
  </div>
</template>

<script>
import {defineComponent, ref, computed} from 'vue';
// import useJsonPath from './useJsonPath'
import {JSONPath} from 'jsonpath-plus';
import Ftable from '../Utilies/Ftable'

function isValidJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export default defineComponent({
  name: "Ftable",
  setup() {
    const source = ref("");
    const jsonFilter = ref('$.')
    // const target = useJsonPath(source, jsonFilter );

    const target = computed(() => {
          if (isValidJson(source.value) && source.value.length >= 5) {
            let t = JSON.parse(source.value);
            let result = JSONPath({path: jsonFilter.value, json: t})
            return result
          }
          return source.value
        }
    )
    const formatTable = computed(() => {
          if (source.value === target) {
            console.log(source.value)
            console.log(target)
            return target;
            // return Ftable.buildTable(target)
          } else if (target.length > 3 || target.value instanceof Object) {

            try {
              let t = JSON.parse(JSON.stringify(target.value))
              let result = Ftable.buildTable(t)
              return result
            } catch {
              return "Error: Can't build table"
            }
          }
        }
    )
    return {
      source,
      jsonFilter,
      target,
      formatTable,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.dataform {

  .inputbox {
    padding-left: 10px;
    padding-right: 10px;
    //width: 50%;
    //width: 50%;
    display: flex;
    flex-direction: row;

    &-container {
      color: red;
      width: 60vw;
      margin-right: 15px;
    }

    &-target > pre {
      color: blue !important;
      width: 40vw;
      // white-space: pre-line;
      min-height: 32px;
      max-height: 43vh;
      text-align: left;
    }

    &-json {
      margin-top: 20px;
    }

  }

  .result {
    padding: 10px;
    text-align: left;
    border: solid 1px black;
    margin-top: 20px;
    white-space: nowrap;
    white-space: pre-line;

    min-height: 45px;
    max-height: 43vh;
    word-break: break-all;
  }
}

::v-deep .ant-input[disabled] {
  background-color: transparent;
}
</style>
