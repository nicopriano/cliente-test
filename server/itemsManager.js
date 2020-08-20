import Axios from 'axios';

export const handleSearch = async (req, res, next) => {

  if(req.query.search) {
    req.meliContext = await getItems(req.query.search);
  }
  next();
}

export const handleItemDetail = async (req, res, next) => {
  req.meliContext = await getItemDetail(req.params.id)
  next();
}

const getItems = async query => {

  const { data } = await Axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`);

  return {
    author: {
      name: "Nicolás",
      lastname: "Priano"
    },
    items: await Promise.all(
      data.results.map(async it => {

        const { data: { symbol, decimal_places } } = await Axios.get(`https://api.mercadolibre.com/currencies/${it.currency_id}`);

        return {
          id: it.id,
          title: it.title,
          price: {
            currency: symbol,
            amount: Number(it.price),
            decimals: decimal_places
          },
          address: it.address.state_name,
          picture: it.thumbnail,
          condition: it.condition === 'new' ? 'Nuevo' : 'Usado',
          free_shipping: it.shipping.free_shipping,
        }
      })
    ),
    categories: data.filters[0].values[0].path_from_root.map(el => el.name)
  }

};

const getItemDetail = id => {
  return Axios.get(`https://api.mercadolibre.com/items/${id}`).then(({ data }) => {
    const currency_id = data.currency_id, category_id = data.category_id;


    return Promise.all([

      Axios.get(`https://api.mercadolibre.com/items/${id}/description`),
      Axios.get(`https://api.mercadolibre.com/currencies/${currency_id}`),
      Axios.get(`https://api.mercadolibre.com/categories/${category_id}`)

    ]).then(([descriptionResponse, currencyResponse, categoryResponse]) => {

      return {
        author: {
          name: 'Nicolás',
          lastname: 'Priano'
        },
        item: {
          id: data.id,
          title: data.title,
          price: {
            currency: currencyResponse.data.symbol,
            amount: Number(data.price),
            decimals: currencyResponse.data.decimal_places
          },
          picture: data.pictures[0] ? data.pictures[0].url : data.thumbnail,
          pictures: data.pictures,
          condition: data.condition === 'new' ? 'Nuevo' : 'Usado',
          free_shipping: data.shipping.free_shipping,
          sold_quantity: data.sold_quantity,
          description: descriptionResponse.data.plain_text,
          attributes: data.attributes.map(attr => ({
            key: attr.name,
            value: attr.value_name
          })),
          categories: categoryResponse.data.path_from_root.map(el => el.name)
        }
      }

    })
    
  })
}