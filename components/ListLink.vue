<template>
  <div class="list text-center">
    <table
      class="table-auto min-w-full border-separate border border-green-800"
    >
      <thead>
        <tr>
          <th class="border border-green-600">ID</th>
          <th class="border border-green-600">Short Link</th>
          <th class="border border-green-600">Link</th>
          <th class="border border-green-600">Click</th>
          <th class="border border-green-600">Create</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in links.data" :key="item.id">
          <td class="border border-green-600">{{ item.id }}</td>
          <td class="border border-green-600">
            <a
              class="text-blue-500 underline cursor-pointer"
              @click="handelRedirect(item.code)"
              >{{ item.code }}
            </a>
          </td>
          <td class="border border-green-600 cursor-not-allowed">
            {{ item.link }}
          </td>
          <td class="border border-green-600">{{ item.click }}</td>
          <td class="border border-green-600">{{ item.created_at }}</td>
        </tr>
      </tbody>
    </table>

    <Pagination v-if="links" :paginate="links.meta" @page="onChangePage" />
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
export default {
  name: "listLink",
  components: {
    Pagination
  },
  data() {
    return {
      links: "",
      limit: "",
      type: {
        type: String,
        default: null
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData(page) {
      const params = {
        page: page || 1,
        limit: 5
      };

      const { data } = await this.getLinks(params);

      this.links = data;
      console.log(
        "🚀 ~ file: ListLink.vue ~ line 70 ~ fetchData ~ this.links",
        this.links
      );
    },
    async getLinks(params = {}) {
      const data = await this.$axios.get("/get-pagination", { params });
      return data;
    },
    onChangePage(page) {
      this.fetchData(page);
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
