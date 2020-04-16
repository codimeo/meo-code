local mail = require "resty.mail"

print("Start")

local mailer, err = mail.new({
    host = "mail.codimeo.com",
    port = 587,
    starttls = true,
    -- AUTH type ne fonctionne pas avec servage.net
    --auth_type = 'login',
    username = "nizar.ayed@codimeo.com",
    password = "11Janvier1996",
})

if err then
    print("mail.new error: " .. err)
    ngx.log(ngx.ERR, "mail.new error: ", err)
    return ngx.exit(ngx.HTTP_INTERNAL_SERVER_ERROR)
else
    print(mailer.options.host)
end

local ok, err = mailer:send({   
    from = "Master Splinter <noreply@meo.codimeo.com>",
    to = { "nizar.ayed@upgrade-code.org" },
    subject = "Pizza is here!",
    text = "There's pizza in the sewer.",
    html = "<h1>There's pizza in the sewer.</h1>",
    attachments = {
        {
            filename = "toppings.txt",
            content_type = "text/plain",
            content = "1. Cheese\n2. Pepperoni",
        },
    },
})
if err then
    print("mail.send error: " .. err)
    ngx.log(ngx.ERR, "mailer:send error: ", err)
    return ngx.exit(ngx.HTTP_INTERNAL_SERVER_ERROR)
elseif ok then
    print("email sent ")
end
