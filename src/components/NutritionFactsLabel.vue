<template>
  <div class="relative mx-auto max-w-container px-4">

    <div class="relative overflow-hidden bg-slate-50 pb-20 pt-12 lg:pb-24 xl:pb-32 sm:px-6 lg:px-8" v-if="labelData">
      <div class="mt-5 lg:flex lg:justify-center items-start">
        <div
          class="relative  shadow-md border border-slate-900/100 ring-1 ring-slate-900/10 sm:mx-0 lg:w-1/4 lg:flex-none lg:order-2">
          <div class="relative bg-white px-2 py-2  ">
            <div class="">
              <h2 class="font-black text-[3rem]/10 text-slate-900"> {{ $t('nutritionFacts') }}</h2>
              <div class="border-t border-slate-900/100 my-1"></div>
            </div>
            <p class="text-2xl "><span>{{ labelData.label.amounts.number_of_servings }}</span>
              {{ $t('servingPerContainer') }}
            </p>

            <div class="flex items-center justify-between">
              <h3 class="font-black text-2xl">{{ $t('servingSize') }}</h3>
              <div class="font-black text-2xl">
                {{ labelData.label.amounts.serving }}g
              </div>
            </div>
            <div class="border-8 border-slate-900/100 my-1"></div>

            <div class="flex items-center justify-between">
              <p class="">
                <span class="font-extrabold  text-2xl text-slate-900"> {{ $t('amountPerServing') }}</span><br>
                <span class="font-black text-[2rem]/10"> {{ translateItem(labelData.label.serving['Calories']) }}
                </span>
              </p>
              <p class="text-[3.25rem]/10 text-slate-900"><span class="font-black"> {{
                Math.ceil(labelData.label.serving['Calories'].value) }} </span></p>
            </div>
            <div class="border-t-8 border-slate-900/100 my-1"></div>

            <div class="flex items-center justify-end">
              <h3 class="text-sm font-semibold">% Daily Value *</h3>
            </div>

            <div class="border-t border-slate-900/100 my-1"></div>
            <template>
              <div>
                <div v-for="(sectionItems, sectionKey) in groupedItems" :key="sectionKey"
                  class="section border-b-8 border-slate-900/100">
                  <template v-for="(item, idx) in sectionItems">
                    <div :key="idx" class="flex items-center justify-between border-b border-slate-900/100"
                      v-if="item.enabled"
                      :class="item.indentations == 1 ? 'pl-5' : item.indentations == 2 ? 'pl-10' : ''">
                      <div class="flex items-center">
                        <h3 class="text-sm" :class="[{ 'font-semibold': !item.indentations }]">
                          {{ translateItem(item) }}
                        </h3> 
                        <span class="px-2"> {{ ConvertToArabicNumbers(Math.ceil(item.value))  }}{{ item.unit ? translateItem(item.unit) : ' g' }}</span>
                      </div>
                      <div>
                        <strong class="font-semibold text-slate-900">
                          {{ ConvertToArabicNumbers(labelData.label.daily_value[item.name]) }}%
                        </strong>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </template>
            <p class="mt-3 text-sm/6 text-slate-600">
              {{ $t('staticText') }}
            </p>
          </div>
        </div>
        <div class="lg:w-2/4 flex lg:order-1">

          <template v-for="(sectionItems, sectionKey) in groupedItems">
            <div :key="sectionKey" class=" w-1/2">
              <template v-for="(item, idx) in sectionItems">
                <div :key="idx">
                  <label class="flex items-center cursor-pointer mb-3">
                    <input v-model="item.enabled" type="checkbox" class="sr-only peer">
                    <div
                      class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {{ translateItem(item) }}</span>
                  </label>
                </div>
              </template>
            </div>
          </template>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { mockData } from '@/../plugins/FDAConfig.js';

export default {
  name: 'NutritionFactsLabel',
  data() {
    return {
      labelData: null,
    }
  },
  methods: {
    getLabelData() {
      this.labelData = mockData();
    },

    translateItem(item) {
      if (this.$i18n.locale == 'ar') {
        return item.name_ar
      }
      return item.name
    },
    sortedData() {
      // sort data by order
      return Object.fromEntries(
        Object.entries(this.labelData.label.serving).sort(([, a], [, b]) => a.order - b.order)
      );
    },
    ConvertToArabicNumbers(value) {
      if (value == undefined) {
        return
      }
      if (this.$i18n.locale !== 'ar') {
        return value
      }
      const arabicNumbers = '\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669';
      return new String(value).replace(/[0123456789]/g, (d) => { return arabicNumbers[d] });

    }
  },
  computed: {
    groupedItems() {
      const itemsArray = Object.values(this.sortedData());
      return itemsArray.reduce((result, item) => {
        if (!result[item.section]) {
          result[item.section] = [];
        }
        result[item.section].push(item);
        return result;
      }, {});
    },
  },
  mounted() {
    this.getLabelData();
  },
  created() {


  }
}
</script>

<style scoped></style>
