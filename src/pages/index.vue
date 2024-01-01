<script setup lang="ts">
const { data: categories } = await useFetch('/api/categories')

const sections = [
  {
    name: 'How it Works',
    description:
            'Share Your Voucher Codes works on a simple principle: sharing is caring. If you have a voucher code that you\'d like to share with the community, simply submit it through our user-friendly submission form. Make sure to include all the necessary details, such as the store name, discount value, expiration date, and any additional terms or conditions. Once reviewed and approved by our team, your voucher code will be published on our website for others to benefit from.',
    icon: 'i-carbon-cognitive',
  },
  {
    name: 'Discover the Latest Codes',
    description:
            'In this section, you can browse through a vast collection of recently shared voucher codes. Explore the wide variety of online stores and categories, ranging from fashion and electronics to home decor and beauty. With new codes constantly being added, you\'ll never miss out on the opportunity to save on your next purchase. Simply click on a voucher code to reveal the details and start saving instantly.',
    icon: 'i-carbon-search',
  },
  {
    name: 'Rate and Comment',
    description:
            'We encourage our community members to rate and comment on the voucher codes they\'ve used. Share your experience with others by leaving feedback on the effectiveness of the code, whether it worked as expected, or if there were any issues encountered during the redemption process. Your insights and opinions will help others make informed decisions and maximize their savings.',
    icon: 'i-carbon-star-filled',
  },
  {
    name: 'Contribute to the Community',
    description:
            'As a member of the VouchersDiscountsCodes community, you can actively contribute by sharing your own voucher codes. By doing so, you not only help fellow users save money but also earn appreciation from the community. Furthermore, you can engage in discussions, exchange tips, and connect with like-minded individuals who are passionate about finding the best deals.',
    icon: 'i-carbon-partnership',
  },
]
</script>

<template>
  <Section>
    <Container>
      <Heading h1>
        Save money with our vouchers, discounts and codes
      </Heading>
      <Heading

        primary h3
        styled="h4"
      >
        Categories
      </Heading>
      <div class="mt-2 flex flex-wrap justify-center space-x-2">
        <ul class="grid grid-cols-3 w-full gap-2 lg:grid-cols-6 md:gap-4">
          <li
            v-for="category in categories"
            :key="category.id"
          >
            <Card
              :title="
                category.category"
              :image-src="`https://source.unsplash.com/random/200x200/?${category.category}`"
              :image-width="195"
              image-classes="object-cover aspect-3/2"
              :to="`/companies?category=${category.id}`"
            />
          </li>
        </ul>
      </div>
    </Container>
  </Section>

  <Section :padding-top="false">
    <Container>
      <Heading

        primary h3
        styled="h4"
      >
        Best Offers
      </Heading>
      <HomeCompanies />
    </Container>
  </Section>

  <Section class="bg-white">
    <Container>
      <div class="mx-auto max-w-2xl lg:text-center">
        <Heading h3>
          made easy and simple
        </Heading>
        <p class="mt-2 text-3xl text-gray-900 font-bold tracking-tight sm:text-4xl">
          Share your voucher codes
        </p>
        <p class="mt-6 text-lg text-gray-600 leading-8">
          We believe in the power of community and collaboration when it comes to saving money. Here, you have the opportunity to share and discover the latest and greatest voucher codes from fellow bargain hunters. Whether you've stumbled upon a fantastic discount code or received an exclusive offer, this is the place to spread the savings and help others save big on their purchases.
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl lg:mt-24 sm:mt-20 lg:max-w-4xl">
        <dl class="grid grid-cols-1 max-w-xl gap-x-8 gap-y-10 lg:grid-cols-2 lg:max-w-none lg:gap-y-16">
          <div
            v-for="section in sections"
            :key="section.name"
            class="relative pl-16"
          >
            <dt class="text-base text-gray-900 font-semibold leading-7">
              <div class="absolute left-0 top-0 h-10 w-10 flex items-center justify-center rounded-lg bg-primary-600">
                <div
                  class="h-6 w-6 text-white"
                  :class="section.icon"
                  aria-hidden="true"
                />
              </div>
              {{ section.name }}
            </dt>
            <dd class="mt-2 text-base text-gray-600 leading-7">
              {{ section.description }}
            </dd>
          </div>
        </dl>
      </div>
    </Container>
  </Section>

  <Section>
    <Container>
      <div class="mx-auto max-w-2xl lg:text-center">
        <p class="text-lg text-gray-500 leading-8">
          Join us in this exciting community-driven initiative to make savings a collaborative effort. Share, discover, and benefit from the collective wisdom of savvy shoppers at VouchersDiscountsCodes. Together, let's unlock incredible discounts and turn every shopping experience into a budget-friendly adventure!
        </p>
      </div>
    </Container>
  </Section>
</template>
