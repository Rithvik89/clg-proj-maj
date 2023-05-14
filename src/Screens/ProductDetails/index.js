import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

function ProductDetailsIndex() {
  const form = useForm({
    initialValues: {
      broughtFrom:'',
      productType:'',
      productName:'',
      weight:'',
      price:'',
      deviceMacId:'',
      termsOfService: false,
    },

    validate: {
    },
  });

  return (
    <Box maw={500} mx="auto" style={{margin:"100px"}}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Product Type"
          placeholder="types like Fruits, Vegetables, Meat ....."
          {...form.getInputProps('productType')}
        />
        <TextInput
          withAsterisk
          label="Product Name"
          placeholder="if fruits names like oranges,bananas, ....."
          {...form.getInputProps('productName')}
        />
        <TextInput
          withAsterisk
          label="Brought From"
          placeholder="product previous owners"
          {...form.getInputProps('broughtFrom')}
        />
        <TextInput
          withAsterisk
          label="Weight"
          placeholder="package weight"
          {...form.getInputProps('weight')}
        />
        <TextInput
          withAsterisk
          label="Price"
          placeholder="price "
          {...form.getInputProps('price')}
        />
        <TextInput
          withAsterisk
          label="Device Mac ID"
          placeholder="esp micro-controllers macID"
          {...form.getInputProps('deviceMacId')}
        />

        <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group position="right" mt="md">
          <Button type="submit" onSubmit = {()=>{
             fetch("https://qzcmrn5rh2.execute-api.ap-south-1.amazonaws.com/productDetails", {
                body: JSON.stringify(form.initialValues),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST"
              })
            .then(res => res.status)
          }}>Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default ProductDetailsIndex