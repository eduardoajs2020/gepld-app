
$(document).ready(function() {
    // Carregar indícios ao carregar a página
    carregarIndicios();

    // Submeter o formulário de indício
    $('#indicioForm').submit(function(e) {
        e.preventDefault();

        var form = $(this);
        var url = 'http://localhost/gepld-app-php/backend/routes/indicios.php';

        $.ajax({
            type: 'POST',
            url: url,
            data: form.serialize(),
            success: function(response) {
                alert(response.message);
                carregarIndicios();
                form.trigger('reset');
            },
            error: function(xhr, status, error) {
                alert('Erro ao cadastrar indício: ' + error);
            }
        });
    });

    // Função para carregar indícios
    function carregarIndicios() {
        $('#indiciosTable tbody').empty();

        $.getJSON('http://localhost/gepld-app-php/backend/routes/indicios.php', function(data) {
            $.each(data.records, function(key, val) {
                var row = $('<tr></tr>');
                row.append('<td>' + val.tipo_pessoa + '</td>');
                row.append('<td>' + val.cpf_cnpj + '</td>');
                row.append('<td>' + val.nome_cliente + '</td>');
                row.append('<td>' + val.produto + '</td>');
                row.append('<td>' + val.data + '</td>');
                row.append('<td>' + val.valor_movimentado + '</td>');
                row.append('<td>' + val.detalhes_movimentacao + '</td>');
                $('#indiciosTable tbody').append(row);
            });
        });
    }
});
