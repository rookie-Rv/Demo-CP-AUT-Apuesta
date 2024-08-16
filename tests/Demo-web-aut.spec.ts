import{test,expect} from '@playwright/test';
import assert from 'assert';

test('Prueba Analista QA - Automatizacion web', async ({ page }) => {

    

    const producto: string='silla gamer';
    
    // Buscamos la pagina de mercado libre
    await page.goto('https://phantom.pe/');

    // Procedemos a loguearnos 

    await page.click('//ul//li[5]//a[contains(@href, "account/login")]')
    await page.fill('input[id=\'email\']','joxihi1147@acpeak.com')
    await page.fill('input[id=\'pass\']','Prueba1508')
    await page.click('//*[@id="send2"]')
    await expect(page.locator('//div[1]/h1/span')).toBeVisible()

   

    //await page.pause()

    // Realizamos la busqueda de la compra
    await page.getByPlaceholder('Buscar...').fill(producto)
    await page.keyboard.press('Enter');
    await page.waitForLoadState('load')
    await page.goto('https://phantom.pe/silla-gamer-razer-iskur-v2-negro.html')
    await page.waitForLoadState('load')
    //await page.fill('//*[@id="search"]', producto);    
    //await expect(page.locator('//a[contains(@class,\'dfd-card-link\')]')).toBeVisible();
    await expect(page.locator('//div[contains(@class, \'page-title-wrapper product\')]')).toBeVisible
    await page.getByRole('button', { name: ' Añadir al carrito' }).click()
    await page.waitForLoadState('load')
    await page.waitForTimeout(5000);

     //capturamos el numero de articulos en el carrito de compras
     const elemento = page.locator('//span[contains(@class,\'counter-number\')]')
     const var_carrito = await elemento.textContent()

    //Validamos que el producto se agrego al carrito
    expect(var_carrito).not.toBe('0')
    const numero: number = var_carrito !== null ? parseInt(var_carrito, 10) : 0;
    console.log(var_carrito)

    //Nos dirigimos a pagar
  
    const nombre_carrito: string=' Mi Bolsa Cart '+ numero +' artículos ';
    console.log(nombre_carrito)

    
    await page.getByRole('link', { name: nombre_carrito }).click()
    await page.waitForTimeout(5000);
    await expect(page.getByText('Subtotal S/')).toBeVisible
    await page.getByRole('button', { name: 'Compra ya' }).click()
    

    //Ingresamos los datos requeridos para la compra
    
    await page.getByLabel('Dirección: Line 1').fill('Av. Los jazmines 2345')
    await page.waitForLoadState('load')
    await page.getByLabel('Código Postal').fill('+51')
    await page.getByLabel('Número de teléfono').fill('970863487')
    await page.locator('#selRecojoUbigeoDepartamento').selectOption('LIMA')
    await page.locator('#selRecojoUbigeoProvincia').selectOption('LIMA')
    await page.locator('#selRecojoUbigeoDistrito').selectOption('CERCADO DE LIMA')
    await page.locator('#label_method_bestway_tablerate').click()
    //await page.getByRole('radio', {name: 'Envio a domicilio Envio'}).click
    await page.getByRole('button', { name: 'SIGUIENTE' }).click()

    //Validacion de precios
    //...........

    //Eleccion metodo de pago
    await page.locator('#visanet_pay').click()
    await page.locator('#visanet_pay-form').click();
    await page.waitForLoadState('load')


    //Finalizamos la compra por falta de efectivo


});