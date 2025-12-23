import { useForm } from 'react-hook-form';
import validation from '../validation';

// eslint-disable-next-line max-len
export const doc = `<div style="display: flex; justify-content: space-between; width: 100%;"><span
style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; margin-top: 32px;">&nbsp;<strong><br>Nota
  Dinas</strong>&nbsp;</span><span style="font-family: Arial,Helvetica,sans-serif;">&nbsp;<br><img
  class="fr-dii fr-fic fr-fir"
  src="https://storage-assurance-dev.mytens.id/tdscustomerpublic/tds-quotation-logo-telkom.png"
  style="width: 136px;"></span></div>
<p><span style="font-family: Arial,Helvetica,sans-serif;"><br></span></p>
<table class="class1 content-table borderless" style="width: 100%;">
<tbody>
<tr>
  <td style="width: 11.9751%; text-align: left; vertical-align: top;"><span
      style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">&nbsp;<strong>Nomor</strong>&nbsp;</span>
  </td>
  <td style="width: 4.6656%; text-align: left; vertical-align: top;">
    <div style="text-align: center;"><span
        style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">:</span></div>
  </td>
  <td style="width: 83.0482%; text-align: left; vertical-align: top;"><span
      style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">{{nde_number}}&nbsp;<br></span></td>
</tr>
<tr>
  <td style="width: 11.9751%; text-align: left; vertical-align: top;"><span
      style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">&nbsp;<strong>Kepada</strong>&nbsp;</span>
  </td>
  <td style="width: 4.6656%; text-align: left; vertical-align: top;">
    <div style="text-align: center;"><span
        style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">:</span></div>
  </td>
  <td style="width: 83.0482%; text-align: left; vertical-align: top;"><span
      style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">Sdr. OPERATION SENIOR MANAGER COLLECTION
      &amp; DEBT MANAGEMENT DWS&nbsp;<br></span></td>
</tr>
<tr>
  <td style="width: 11.9751%; text-align: left; vertical-align: top;"><span
      style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">&nbsp;<strong>Dari</strong>&nbsp;</span>
  </td>
  <td style="width: 4.6656%; text-align: left; vertical-align: top;">
    <div style="text-align: center;"><span
        style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">:</span></div>
  </td>
  <td style="width: 83.0482%; text-align: left; vertical-align: top;"><span
      style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">GENERAL MANAGER VALUE ADDED SERVICE,
      CONTENT, AND SERVICE PROVIDER DWS&nbsp;<br></span></td>
</tr>
<tr>
  <td style="width: 11.9751%; text-align: left; vertical-align: top;"><span
      style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">&nbsp;<strong>Lampiran</strong>&nbsp;</span>
  </td>
  <td style="width: 4.6656%; text-align: left; vertical-align: top;">
    <div style="text-align: center;"><span
        style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">:</span></div>
  </td>
  <td style="width: 83.0482%; text-align: left; vertical-align: top;"><span
      style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">1 (Satu) Dokumen&nbsp;<br></span></td>
</tr>
<tr>
  <td style="width: 11.9751%; text-align: left; vertical-align: top;"><span
      style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">&nbsp;<strong>Perihal</strong>&nbsp;</span>
  </td>
  <td style="width: 4.6656%; text-align: left; vertical-align: top;">
    <div style="text-align: center;"><span
        style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">:</span></div>
  </td>
  <td style="width: 83.0482%; text-align: left; vertical-align: top;"><span
      style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">Hasil Rekonsiliasi Layanan Cloud
      Elastica antara Telkom dan {{companyName}} untuk Trafik Bulan {{periodeText}}&nbsp;<br></span></td>
</tr>
</tbody>
</table>
<p><span style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;"><br></span></p>
<ol>
<li style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;">Merujuk kepada Risalah Rapat Rekonsiliasi
Penggunaan Layanan Elastica Cloud antara TELKOM dan {{companyName}}
tanggal {{settlementDate}}</li>
<li style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">Bersama dengan surat ini, Kami menyampaikan
terkait penggunaan (usage) dari layanan cloud oleh {{companyName}} untuk bulan {{periodeText}}</li>
<li style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">Sehubungan dengan hasil rekonsiliasi
tersebut di atas, maka mohon bantuan Saudara untuk membuat invoice layanan kepada {{companyName}} dengan Hak
Telkom dengan detail sebagai berikut:<br><br>
<table class="class2 content-table" style="width: 100%;">
  <thead>
    <tr>
      <th style="text-align: center;"><strong>User</strong></th>
      <th style="width: 20.0871%;">
        <div style="text-align: center;">Billing Type</div>
      </th>
      <th style="width: 22.9711%;">
        <div style="text-align: center;">Component</div>
      </th>
      <th style="width: 32.4186%; text-align: center;">Pretax Cost (IDR)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="9" style="width: 24.8756%;">
        <div style="text-align: center;">{{user email}}</div>
      </td>
      <td rowspan="6" style="width: 20.0871%; text-align: center;">Monthly Usage-based neuCloud elastiCa</td>
      <td style="width: 22.9711%;">Virtual Machine</td>
      <td style="width: 32.4186%; text-align: right;">{{virtualMachinesCost}}</td>
    </tr>
    <tr>
      <td style="width: 22.9711%;">Additional Value</td>
      <td style="width: 32.4186%; text-align: right;">{{additionalVolumeCost}}</td>
    </tr>
    <tr>
      <td style="width: 22.9711%;">Additional Public IP</td>
      <td style="width: 32.4186%; text-align: right;">{{additionalPublicIpCost}}</td>
    </tr>
    <tr>
      <td style="width: 22.9711%;">License</td>
      <td style="width: 32.4186%; text-align: right;">{{licenseCost}}</td>
    </tr>
    <tr>
      <td style="width: 22.9711%;">Service</td>
      <td style="width: 32.4186%; text-align: right;">{{serviceCost}}</td>
    </tr>
    <tr>
      <td style="width: 22.9711%;">Object Storage</td>
      <td style="width: 32.4186%; text-align: right;">{{objectStorageCost}}</td>
    </tr>
    <tr>
      <td colspan="2" style="width: 42.8716%;"><strong>Usage-based Total</strong></td>
      <td style="width: 32.4186%; text-align: right;">{{usageBasedTotalCost}}</td>
    </tr>
    <tr>
      <td colspan="2" style="width: 42.8716%;"><strong>Monthly Recurring</strong></td>
      <td style="width: 32.4186%; text-align: right;">-</td>
    </tr>
    <tr>
      <td colspan="2" style="width: 42.8716%;"><strong>Monthly Recurring Total</strong></td>
      <td style="width: 32.4186%; text-align: right;">-</td>
    </tr>
    <tr>
      <td colspan="3" style="width: 67.4155%; text-align: left;"><strong>Total</strong></td>
      <td style="width: 32.4187%; text-align: right;">{{usageBasedTotalCost}}</td>
    </tr>
  </tbody>
</table><br>
</li>
<li style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">Untuk informasi lebih lanjut, Saudara dapat
menghubungi AM DWS {{amName}} ({{amPhone}})</li>
<li style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">Demikian Kami sampaikan, terima kasih atas
perhatian dan kerjasamanya. Salam &quot;Firming The Foundation of Transformation, WINDIGITAL - Take Your
Lead!&quot;</li>
</ol>
<p><span style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;"><br></span></p>
<table class="class1 borderless" style="width: 61%; margin-right: calc(39%);">
<tbody>
<tr>
  <td style="width: 26.3244%;"><span style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">Jakarta,
      11 November 2022</span></td>
</tr>
<tr>
  <td style="width: 26.3244%;"><span
      style="font-family: Arial, Helvetica, sans-serif; font-size: 14px;"><br><br><br></span></td>
</tr>
<tr>
  <td style="width: 26.3244%;"><span
      style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;"><strong>ABD. RAUF JAUHARI IZZA
        MAZZIDAN</strong></span></td>
</tr>
<tr>
  <td style="width: 26.3244%;"><span style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">NIK:
      20015014</span></td>
</tr>
</tbody>
</table>
<p><br></p>
<p><span
style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;"><strong><u>Tembusan</u>&nbsp;</strong>&nbsp;</span>
</p>
<ol>
<li style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">Sdr. MANAGER BILLING VALIDATION DWS</li>
<li style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">Sdr. MANAGER VERIFICATION AND SETTLEMENT DWS
</li>
<li style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">Sdr. MANAGER INVOICING AND COLLECTION
MANAGEMENT DWS</li>
<li style="font-size: 14px; font-family: Arial, Helvetica, sans-serif;">Sdr. MANAGER WHOLESALE TRANSACTION RECORDING
DWS</li>
</ol>`;

const useAction = () => {
  const { control, watch, handleSubmit } = useForm({
    resolver: validation,
    mode: 'onChange',
    defaultValues: {
      // html2: doc,
    },
  });

  // eslint-disable-next-line no-console
  const onSubmit = handleSubmit((x) => console.log(x));

  // eslint-disable-next-line no-console
  console.log(watch());

  return {
    control,
    onSubmit,
  };
};

export default useAction;
