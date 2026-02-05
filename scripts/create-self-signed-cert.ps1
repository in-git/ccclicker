# 创建自签名证书用于代码签名
param(
    [string]$CertName = "连点点应用签名证书",
    [string]$OutputPath = ".\cert.pfx",
    [string]$Password = "your-cert-password"
)

Write-Host "创建自签名证书..." -ForegroundColor Green

# 创建自签名证书
$cert = New-SelfSignedCertificate -Type CodeSigningCert -Subject "CN=$CertName" -KeyAlgorithm RSA -KeyLength 2048 -Provider "Microsoft Enhanced RSA and AES Cryptographic Provider" -KeyExportPolicy Exportable -KeyUsage DigitalSignature -CertStoreLocation Cert:\CurrentUser\My

Write-Host "证书创建成功，指纹: $($cert.Thumbprint)" -ForegroundColor Green

# 导出证书到 PFX 文件
$certPassword = ConvertTo-SecureString -String $Password -Force -AsPlainText
Export-PfxCertificate -Cert $cert -FilePath $OutputPath -Password $certPassword

Write-Host "证书已导出到: $OutputPath" -ForegroundColor Green
Write-Host "证书密码: $Password" -ForegroundColor Yellow

# 将证书添加到受信任的根证书颁发机构（可选，用于本地测试）
$choice = Read-Host "是否将证书添加到受信任的根证书颁发机构？(y/n)"
if ($choice -eq "y" -or $choice -eq "Y") {
    $store = New-Object System.Security.Cryptography.X509Certificates.X509Store([System.Security.Cryptography.X509Certificates.StoreName]::Root, [System.Security.Cryptography.X509Certificates.StoreLocation]::CurrentUser)
    $store.Open([System.Security.Cryptography.X509Certificates.OpenFlags]::ReadWrite)
    $store.Add($cert)
    $store.Close()
    Write-Host "证书已添加到受信任的根证书颁发机构" -ForegroundColor Green
}

Write-Host "完成！现在可以使用此证书对应用进行签名。" -ForegroundColor Green