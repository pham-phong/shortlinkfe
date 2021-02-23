<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="py-3 flex items-center justify-center sm:justify-end">
    <div class="flex-1 flex justify-between sm:hidden">
      <button
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
        :class="{ 'cursor-default opacity-50': isFirstPage }"
        :disabled="isFirstPage"
        @click.prevent="prevUrl"
      >
        Previous
      </button>
      <button
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
        :class="{ 'cursor-default opacity-50': isLastPage }"
        :disabled="isLastPage"
        @click.prevent="nextUrl"
      >
        Next
      </button>
    </div>
    <div class="hidden sm:flex sm:items-center sm:justify-between">
      <div>
        <nav class="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
          <button
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            :class="{ 'cursor-default opacity-50': isFirstPage, 'hover:bg-blue-400 hover:text-white': !isFirstPage }"
            :disabled="isFirstPage"
            @click.prevent="prevUrl"
          >
            <span class="sr-only">Previous</span>
            <!-- Heroicon name: chevron-left -->
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button
            v-for="(page, index) in pages"
            :key="index"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
            :class="{
              'cursor-default': shouldDisable(page),
              'cursor-pointer': !shouldDisable(page),
              'bg-blue-400 text-white': activePage(page),
              'text-white hover:text-gray-500 hover:bg-gray-50': !activePage(page),
            }"
            :disabled="shouldDisable(page)"
            @click.prevent="changePage(page)"
          >
            {{ page }}
          </button>
          <button
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            :class="{ 'cursor-default opacity-50': isLastPage, 'hover:bg-blue-400 hover:text-white': !isLastPage }"
            :disabled="isLastPage"
            @click.prevent="nextUrl()"
          >
            <span class="sr-only">Next</span>
            <!-- Heroicon name: chevron-right -->
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paginate: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isFirstPage() {
      return this.paginate.current_page === 1
    },
    isLastPage() {
      return this.paginate.current_page === this.paginate.last_page
    },
    pages() {
      //https://gist.github.com/kottenator/9d936eb3e4e3c3e02598#gistcomment-3238804
      const getRange = (start, end) => {
        return Array(end - start + 1)
          .fill()
          .map((v, i) => i + start)
      }

      const paginate = (currentPage, pageCount) => {
        let delta
        if (pageCount <= 7) {
          // delta === 7: [1 2 3 4 5 6 7]
          delta = 7
        } else {
          // delta === 2: [1 ... 4 5 6 ... 10]
          // delta === 4: [1 2 3 4 5 ... 10]
          delta = currentPage > 4 && currentPage < pageCount - 3 ? 2 : 4
        }

        const range = {
          start: Math.round(currentPage - delta / 2),
          end: Math.round(currentPage + delta / 2),
        }

        if (range.start - 1 === 1 || range.end + 1 === pageCount) {
          range.start += 1
          range.end += 1
        }

        let pages =
          currentPage > delta
            ? getRange(Math.min(range.start, pageCount - delta), Math.min(range.end, pageCount))
            : getRange(1, Math.min(pageCount, delta + 1))

        const withDots = (value, pair) => (pages.length + 1 !== pageCount ? pair : [value])

        if (pages[0] !== 1) {
          pages = withDots(1, [1, '...']).concat(pages)
        }

        if (pages[pages.length - 1] < pageCount) {
          pages = pages.concat(withDots(pageCount, ['...', pageCount]))
        }

        return pages
      }

      return paginate(this.paginate.current_page, this.paginate.last_page)
    },
  },
  methods: {
    prevUrl() {
      if (this.isFirstPage) {
        return
      }

      return this.changePage(this.paginate.current_page - 1)
    },

    nextUrl() {
      if (this.isLastPage) {
        return
      }

      return this.changePage(this.paginate.current_page + 1)
    },

    shouldDisable(page) {
      return this.paginate.current_page === page || '...' === page
    },

    activePage(page) {
      return this.paginate.current_page === page
    },

    changePage(page) {
      if (page < 1 || page > this.paginate.last_page) {
        return
      }

      this.$emit('page', page)
    },
  },
}
</script>
