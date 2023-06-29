export default defineEventHandler(() => {
  console.log('Seeding companies')

  for (let i = 0; i < 20; i++) {
    console.log('getting company links', i)

    $fetch('/seedData/companies/seedCompany', {
      method: 'POST',
      body: { pageNumber: i },
    })
  }

  console.log('-'.repeat(20))

  return 'Seeding companies'
})
