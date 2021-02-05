<template>
  <div class="list text-center">
    <table
      class="table-auto min-w-full border-separate border border-green-800"
    >
      <thead>
        <tr>
          <th class="border border-green-600">ID</th>
          <th class="border border-green-600">Code</th>
          <th class="border border-green-600">Link</th>
          <th class="border border-green-600">Click</th>
          <th class="border border-green-600">Create</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in links" :key="item.id">
          <td class="border border-green-600">{{ item.id }}</td>
          <td class="border border-green-600">
            <a
              class="text-blue-500 underline"
              @click="handelRedirect(item.code)"
              >{{ item.code }}
            </a>
          </td>
          <td class="border border-green-600">{{ item.link }}</td>
          <td class="border border-green-600">{{ item.click }}</td>
          <td class="border border-green-600">{{ item.created_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "listLink",
  data() {
    return {
      links: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.getLinks().then(res => {
        this.links = res;
      });
    },
    async getLinks() {
      const { data } = await this.$axios.get("/get-shortlink");
      return data;
    },
    async handelRedirect(code) {
      const { data } = await this.$axios.get(`/${code}`);

      window.location.href = `${data}`;
      // this.$router.push({ redirect: window.location.href = 'https://google.com' });
      // return data;
    }
  }
};
</script>
