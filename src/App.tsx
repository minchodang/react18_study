import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
// ProductType 인터페이스 정의
interface ProductType {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}
interface SearchProductType {
  isOnlyStocked: boolean;
  setFilteredText: Dispatch<SetStateAction<string>>;
  setIsOnlyStocked: Dispatch<SetStateAction<boolean>>;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

// ProductCategoryRow 컴포넌트
function ProductCategoryRow({ category }: { category: string }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

// ProductRow 컴포넌트
function ProductRow({ product }: { product: ProductType }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

// ProductTable 컴포넌트
function ProductTable({
  products,
  filteredText,
  isOnlyStocked,
}: {
  products: ProductType[];
  filteredText: string;
  isOnlyStocked: boolean;
}) {
  const rows: JSX.Element[] = [];
  let lastCategory: string | null = null;

  products.forEach((product) => {
    if (isOnlyStocked && !product.stocked) {
      return;
    }
    if(filteredText && !product.name.toLowerCase().includes(filteredText.toLowerCase())) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

// SearchBar 컴포넌트
function SearchBar({
  setFilteredText,
  isOnlyStocked,
  setIsOnlyStocked,
}: SearchProductType) {
  return (
    <Form>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setFilteredText(e.target.value);
        }}
      />
      <label>
        <input
          type="checkbox"
          checked={isOnlyStocked}
          onChange={(e) => {
            setIsOnlyStocked(e.target.checked);
          }}
        />{' '}
        Only show products in stock
      </label>
    </Form>
  );
}

// FilterableProductTable 컴포넌트
function FilterableProductTable({ products }: { products: ProductType[] }) {
  const [filteredText, setFilteredText] = useState<string>('');
  const [isOnlyStocked, setIsOnlyStocked] = useState<boolean>(false);
  return (
    <Container>
      <SearchBar
        setFilteredText={setFilteredText}
        isOnlyStocked={isOnlyStocked}
        setIsOnlyStocked={setIsOnlyStocked}
      />
      <ProductTable
        products={products}
        filteredText={filteredText}
        isOnlyStocked={isOnlyStocked}
      />
    </Container>
  );
}

const PRODUCTS: ProductType[] = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
];

// App 컴포넌트
export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}

/*
- 검색 입력어. 
- 재고 여부 (필터링)
*/
