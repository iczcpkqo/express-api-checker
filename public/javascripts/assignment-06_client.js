$(document).ready(()=>{

    /**
     * Test Add One Random User
     */
    $(document).on('click', '#btn-adduser', ()=>{
        let data = strJson({
            title: getRandomTitle(),
            first_name: getRandomFirstName(),
            surname: getRandomSurName(),
            mobile: getRandomMobile(),
            email: getRandomEmail(),
            address: {
                addr_1: getRandomAddress(),
                addr_2: getRandomAddress(),
                town: getRandomAddress(),
                county: getRandomAddress(),
                eircode: getRandomScore()
            }
        });

        $.post('/api/post/user',data).
            done((o)=>{
                console.log('== Insert User Info: ' + o + '==');
                $('#console-box').html(o);
            });
    });

    /**
     * Test Add One Random Item
     */
    $(document).on('click', '#btn-additem', ()=>{
        let data = strJson({
                manufacturer: getRandomManufacturer(),
                model: getRandomModel(),
                price: getRandomPrice()
    });

        $.post('/api/post/item',data).
        done((o)=>{
            console.log('== Insert Item Info: ' + o + '==');
            $('#console-box').html(o);
        });
    });

    /**
     * Test Add One Random Order
     */
    $(document).on('click', '#btn-addorder', ()=>{
        let d = new Date();
        let data = strJson({
            time: d.getDate() + '.' + d.getMonth() + '.' + d.getFullYear(),
            address: {
                addr_1: getRandomAddress(),
                addr_2: getRandomAddress(),
                town: getRandomAddress(),
                county: getRandomAddress(),
                eircode: getRandomScore()
            },
            client: {
                title: getRandomTitle(),
                first_name: getRandomFirstName(),
                surname: getRandomSurName(),
                mobile: getRandomMobile(),
                email: getRandomEmail(),
                address: {
                    addr_1: getRandomAddress(),
                    addr_2: getRandomAddress(),
                    town: getRandomAddress(),
                    county: getRandomAddress(),
                    eircode: getRandomScore()
                }
            },
            items: (()=>{
                let arr = [];
                for(let i=~~(Math.random()*10); i<10; i++)
                    arr.push({
                        manufacturer: getRandomManufacturer(),
                        model: getRandomModel(),
                        price: getRandomPrice()
                    });
                console.log(arr);
                return arr;
            })()
        });

        $.post('/api/post/order',data).
        done((o)=>{
            console.log('== Insert Order Info: ' + o + '==');
            $('#console-box').html(o);
        });
    });


    /**
     * Test Select All Users Info
     */
    $(document).on('click', '#btn-selusers', ()=>{
        $.get('/api/get/users').
            done((o)=>{
            console.log('== Select All Users Info: ' + o + '==');
            $('#console-box').html(JSON.stringify(o));
        });
    });


    /**
     * Test Select All Items
     */
    $(document).on('click', '#btn-selitems', ()=>{
        $.get('/api/get/items').
        done((o)=>{
            console.log('== Select All Users Info: ' + o + '==');
            $('#console-box').html(JSON.stringify(o));
        });
    });

    /**
     * Test Select All Items
     */
    $(document).on('click', '#btn-selorders', ()=>{
        $.get('/api/get/orders').
        done((o)=>{
            console.log('== Select All Orders Info: ' + o + '==');
            $('#console-box').html(JSON.stringify(o));
        });
    });

    /**
     * Test Update A User Info
     */
    $(document).on('click', '#btn-updateuser', ()=>{

        let data = strJson({
            where: {id: $('#user-id').val()},
            doc: {[$('#user-info').val()]: $('#user-value').val()}
        });
        $.ajax({
            url: '/api/put/user',
            type: 'PUT',
            data: data
        }).done((o)=>{
            console.log('== Update One User Info: ' + o + '==');
            $('#console-box').html(o);
        });
    });

    /**
     * Test Update One Item Info
     */
    $(document).on('click', '#btn-updateitem', ()=>{
        let data = strJson({
            where: {id: $('#item-id').val()},
            doc: {[$('#item-info').val()]: $('#item-value').val()}
        });
        $.ajax({
            url: '/api/put/item',
            type: 'PUT',
            data: data
        }).done((o)=>{
            console.log('== Update One Item Info: ' + o + '==');
            $('#console-box').html(o);
        });
    });

    /**
     * Test Update One Order Address
     */
    $(document).on('click', '#btn-update-order-address', ()=>{
        let data = strJson({
            where: {id: $('#order-id').val()},
            doc: {
                ['address.' + $('#order-info').val()] : $('#order-value').val()
            }
        });
        $.ajax({
            url: '/api/put/order/address',
            type: 'PUT',
            data: data
        }).done((o)=>{
            console.log('== Update One Order Address Info: ' + o + '==');
            $('#console-box').html(o);
        });
    });


    /**
     * Test Delete One User
     */
    $(document).on('click', '#btn-deleteuser', ()=>{
        let data = strJson({
        where: {id: $('#user-d-id').val()},
        });
        $.ajax({
            url: '/api/delete/user',
            type: 'DELETE',
            data: data
        }).done((o)=>{
            console.log('== DELETE One User: ' + o + '==');
            $('#console-box').html(o);
        });
    });


    /**
     * Test Delete One Item
     */
    $(document).on('click', '#btn-deleteitem', ()=>{
        let data = strJson({
            where: {id: $('#item-d-id').val()},
        });
        $.ajax({
            url: '/api/delete/item',
            type: 'DELETE',
            data: data
        }).done((o)=>{
            console.log('== DELETE One Item: ' + o + '==');
            $('#console-box').html(o);
        });
    });

    /**
     * Test Delete One Order
     */
    $(document).on('click', '#btn-deleteorder', ()=>{
        let data = strJson({
            where: {id: $('#order-d-id').val()},
        });
        $.ajax({
            url: '/api/delete/order',
            type: 'DELETE',
            data: data
        }).done((o)=>{
            console.log('== DELETE One order: ' + o + '==');
            $('#console-box').html(o);
        });
    });


});


function strJson(data){
    data = JSON.stringify(data);
    return  { data:data };
}

// Random User Info
function getRandomTitle(){
    return randomArray(titleBox);
}

function getRandomFirstName(){
    return randomArray(fnameBox);
}

function getRandomSurName(){
    return randomArray(snameBox);
}

function getRandomMobile(){
    let num = '(' + randomArray(mobileFirstBox) + ')';
    num += ' ';

    for (let i=0; i<7; i++)
        num += ~~(Math.random()*10);

    return num;
}

function getRandomEmail() {
    let times = ~~(Math.random()*12);
    let str = '';
    times = times>5? times : 6;

    for(let i=0; i<times; i++)
        str += randomArray(emailNameBox);

    return str + '@' + randomArray(emailsuffixBox);
}

function getRandomAddress() {
    return randomArray(addressBox) + ' ' + randomArray(addressBox);
}

function getRandomScore() {
    return ~~(Math.random()*100000);
}

// Random Goods Info
// random manufacturer
function getRandomManufacturer(){
    return randomArray(phoneManufacturerBox);
}

// random model
function getRandomModel(){
    return randomArray(phoneModelBox) + ' ' + randomArray(phoneModelNumBox) + ' ' + randomArray(phoneModelLastBox);
}

// random price
function getRandomPrice(){
    return ~~(Math.random()*1000) + '.' + ~~(Math.random()*100);
}

function randomArray(arr) {
    let len = arr.length;
    return arr[~~(Math.random()*arr.length)];
}



const fnameBox =[
    'MARK', 'VINCENT', 'LYNCH', 'DAVID', 'RALPH', 'HETHERINGTON', 'SULTAN', 'NUMYALAI', 'RICHARD', 'OGBONNAYA',
    'ANDREI', 'GHET', 'INGRID', 'PÉREZ', 'AGUILERA', 'TADHG', 'JAMES', 'WHITE', 'TAMARA', 'VERSHININA',
    'JORDAN', 'AYOMILEKAN', 'SHODIPO', 'GANG', 'AN', 'JOSE', 'LORENZO', 'DIAGO', 'BOLUWATIFE', 'NICK',
    'OGUNTUASE', 'JACK', 'DIGNAM', 'MARK', 'MC', 'GEE', 'SANDRA', 'ANGELIKA', 'PILSZAK', 'ASTLE',
    'MALCOLM', 'CUTINHA', 'JAKE', 'SIEWER', 'LAURENTIU', 'IOSIF', 'MOLDOVAN', 'ENDA', 'MARK', 'HOSTY',
    'LOLA', 'KATE', 'CROWLEY', 'JAMIE', 'DOWLING', 'JOSEPH', 'OLUMIDE', 'AKANDE', 'CIARAN', 'RAMSEY-MACLEOD',
    'NINIKACHUKWU', 'UDOCHUKWU', 'JOHN', 'EMEZI', 'RIÁN', 'BERNARD', 'DALY', 'CLARKE', 'STEPHEN', 'JOSEPH',
    'NOLAN', 'CLINTON', 'PAUL', 'JAMES', 'BATES', 'CONOR', 'GERARD', 'WALSH', 'CIARAN', 'MC',
    'GINLEY', 'RAJENDR', 'SINGH', 'SCOTT', 'MATTHEW', 'LEIGH', 'SYED', 'MUHAMMAD', 'KHURSHID', 'ABBAS',
    'JEMMA', 'MOLLOY', 'EMMANUEL', 'OLUWATOMISIN', 'AKINBOREWA', 'SEIK', 'YAN', 'CHOONG', 'ANNMARY', 'TREASA'
];
const snameBox = [
    'NICK', 'OGUNTUASE', 'JACK', 'DIGNAM', 'MARK', 'MC', 'GEE', 'SANDRA', 'ANGELIKA', 'PILSZAK',
    'ASTLE', 'MALCOLM', 'CUTINHA', 'JAKE', 'SIEWER', 'LAURENTIU', 'IOSIF', 'MOLDOVAN', 'ENDA', 'MARK',
    'HOSTY', 'LOLA', 'KATE', 'CROWLEY', 'JAMIE', 'DOWLING', 'JOSEPH', 'OLUMIDE', 'AKANDE', 'CIARAN',
    'RAMSEY-MACLEOD', 'NINIKACHUKWU', 'UDOCHUKWU', 'JOHN', 'EMEZI', 'RIÁN', 'BERNARD', 'DALY', 'CLARKE', 'STEPHEN',
    'JOSEPH', 'NOLAN', 'CLINTON', 'PAUL', 'JAMES', 'BATES', 'CONOR', 'GERARD', 'WALSH', 'CIARAN',
    'MC', 'GINLEY', 'RAJENDR', 'SINGH', 'SCOTT', 'MATTHEW', 'LEIGH', 'SYED', 'MUHAMMAD', 'KHURSHID',
    'ABBAS', 'JEMMA', 'MOLLOY', 'EMMANUEL', 'OLUWATOMISIN', 'AKINBOREWA', 'SEIK', 'YAN', 'CHOONG', 'ANNMARY',
    'TREASA', 'JOSEPH', 'ROSS', 'WARD', 'HASSANATOU', 'DIALLO', 'KONRAD', 'SOKUN', 'EMMETT', 'PATRICK',
    'MULROY', 'COLM', 'ALEXANDER', 'DONOHUE', 'ALEXANDRU', 'BOGDAN', 'DUMITRU', 'JONATHAN', 'STEPHEN', 'MC',
    'NAMEE', 'JASON', 'DRAGOMIR', 'OISIN', 'THOMAS', 'HAMILL', 'CRISTINA', 'GONZALEZ', 'MARRERO', 'JOSIAH'
];

const mobileFirstBox = ['087','089','0571', '086'];
const emailNameBox = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const emailsuffixBox = ['yahoo.net', '163.com', 'gamil.com', 'outlook.com', 'mumail.ie', 'tcd.ie'];
const addressBox = ['Cahir', 'Cashel', 'Carrick', 'Tipperary', 'Thurles', 'Nenagh', 'Roscrea', 'Clonmel', 'Knock',
    'Castlebar', 'Ballina', 'Westport', 'Ballinrobe', 'Ballyhaunis', 'Roscommon', 'Castlerea', 'Boyle', 'Ballymote',
    'Sligo', 'Letterkenny', 'Lifford', 'Bundoran', 'Cavan', 'Belturbet', 'Cootehill', 'Monaghan', 'Clones',
    'Ballinasloe', 'Tuam', 'Loughrea', 'Athenry', 'Clifden', 'Galway', 'Balbriggan', 'Skerries', 'Malahide', 'Lusk',
    'Rush', 'Swords', 'Lucan', 'Athlone', 'Longford', 'Carrick', 'Mullingar', 'Macroom', 'Crookstown', 'Kinsale',
    'Cobh', 'Midleton', 'Ballincollig', 'Rylane', 'Youghal', 'Carrigaline', 'Dunmanway', 'Mallow', 'Charleville',
    'Fermoy', 'Mitchelstown', 'Bandon', 'Bantry', 'Skibbereen', 'Clonakilty', 'Athy', 'Bagenalstown', 'Portlaoise',
    'Tullamore', 'Birr', 'Edenderry', 'Kildare', 'Curragh', 'Carlow', 'Kilkenny', 'Cork', 'Cork', 'Carrignavar',
    'Glanmire', 'Watergrasshill', 'Shannon', 'Kilrush', 'Caherciveen', 'Listowel', 'Kilmallock', 'Newcastle', 'Tralee',
    'Kenmare', 'Limerick', 'Miltown', 'Newbridge', 'Maynooth', 'Monasterevin', 'Naas', 'Kilmacthomas', 'Waterford',
    'Arklow', 'Enniscorthy', 'Gorey', 'New', 'Wexford']

const titleBox = ['Mx', 'Ms', 'Mr', 'Mrs', 'Miss', 'Dr', 'Other'];

const phoneManufacturerBox = ['Apple', 'Nokia', 'Sony', 'Samsung', 'Alcatel', 'Motorola', 'TCL', 'Google', 'LG', 'HTC', 'CUBOT', 'Xiang', 'MAO'];
const phoneModelBox = ['Galaxy', 'MEGA', 'VLU', 'myPhone', 'BEST'];
const phoneModelNumBox = ['18', '19', '20', '21', '22', 'Honor', 'Hero', 'Suv', 'X', 'Y',];
const phoneModelLastBox = ['MAX', 'PLUS', 'VIP', 'SVIP', 'SSVIP', 'LUXURY', 'IMPOSING', 'RARE', 'XIANG', 'MAO'];
