**REXIM CORE**
Master branch 

**Rules**
Rule 1 - No results found

	In "catalogsearch/result/" page when ".note-msg" == "Your search returns no results." then no results found for product "?q="

Rule 2 - Coupon code error
	In "/checkout/cart/" page when ".error-msg" ."ul" ."li" == "Coupon code "super" is not valid." and 
	(".cart-price" ."price" = > 2000) send alert "coupon code for customer with price > 2000"

Rule 3 - Add to cart subtotal over 2000 usd

Rule 4 - Cart abandonment

Rule 5 - 