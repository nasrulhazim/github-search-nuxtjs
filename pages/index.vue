<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
    <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
      <div class="px-4 py-5 sm:px-6">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
          GitHub Search
        </h2>
      </div>
      <div class="px-4 py-5 sm:p-6">
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-6 lg:col-span-2">
            <label for="token" class="block text-sm font-medium text-gray-700">Token</label>
            <input type="text" name="token" id="token" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" v-model="token" placeholder="GitHub Personal Access Token">
          </div>
          <div class="col-span-6 sm:col-span-6 lg:col-span-2">
            <label for="type" class="block text-sm font-medium text-gray-700">Type</label>
            <select id="type" name="type" class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" v-model="type" placeholder="Search Type">
              <option v-for="type of types" :key="type.key" v-bind:value="type.key">{{ type.label }}</option>
            </select>
          </div>
          <div class="col-span-6 sm:col-span-6 lg:col-span-2">
            <label for="term" class="block text-sm font-medium text-gray-700">Term</label>
            <input type="text" name="term" id="term" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" v-model="term" placeholder="Your search term">
          </div>
        </div>
        <div class="flex justify-end py-4">
          <button @click="$fetch" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span v-if="$fetchState.pending">Searching...</span>
            <span v-else>Search</span>
          </button>
        </div>
        <div class="py-4">
          <span v-if="$fetchState.error" class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
            Unable to fetch 
          </span>
        </div>
        <div class="pt-4">
          <h3>Search Results ({{ total_count }})</h3>
          <ul class="divide-y divide-gray-200">
            <li v-for="item in items" class="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <div class="flex justify-between space-x-3">
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900" id="privacy-option-1-label">
                    {{ item.name }}
                  </p>
                  <p  v-if="item.hasOwnProperty('description')" class="text-sm text-gray-500">
                    {{ item.description }}
                  </p>
                  <a v-if="item.hasOwnProperty('html_url')" class="text-indigo-300 hover:text-indigo-700" target="_blank" :href="item.html_url">{{ item.html_url }}</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- END: index.vue root -->
  </div> 
</template>

<script>
  export default {
    data() {
      return {
        github: {
          endpoint: 'https://api.github.com/search/',
          version: 'v3'
        },
        token: '',
        keyword: "",
        type: 'repositories',
        term: '',
        data: {
          total_count : 0,
          incomplete_results : false,
          items : []
        },
        items: [],
        total_count : 0,
        types: [
          {
            'key' : 'repositories',
            'label' : 'Repository'
          },
          {
            'key' : 'topics',
            'label' : 'Topic'
          }
        ]
      }
    },
    async fetch() { 
      if(this.token != "") {
        let response = await fetch(this.github.endpoint + this.type + '?q=' + this.term, {
          headers: {
            Accept: this.type == 'topics' ? 'application/vnd.github.mercy-preview+json' : 'application/vnd.github.'+this.github.version+'+json',
            Authorization: 'token ' + this.token
          }
        })
        let data = await response.json();
        this.items = data.items;
        this.total_count = data.total_count;
        fetch('api/github/search', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: JSON.stringify({
            type: this.type,
            term: this.term,
            responses: data
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
    }
  }
</script>